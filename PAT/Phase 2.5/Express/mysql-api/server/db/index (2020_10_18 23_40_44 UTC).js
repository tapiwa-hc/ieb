const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  password: "ltS^Cf39Ppvr", //how to generalise db connection
  user: "root",
  database: "pat_sandbox",
  host: "localhost",
  port: "3306",
});

let db = {};

/*
 * Returns an Array containing all pending notices from the database
 * @returns {Promise<PendingNotice[]>}
 */
db.getPending = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT
      notices.notice_id AS id,
      notices.display_date,
      groupings.name AS grouping_name,
      notices.title,
      notices.description,
      CONCAT(LEFT(users.first_name, 1), " ", users.surname) AS user
    FROM notices
    INNER JOIN users
      ON notices.user_id = users.user_id
    INNER JOIN groupings
      ON notices.grouping_id = groupings.grouping_id
    WHERE notices.approval_status = 'Pending'
    ORDER BY notices.publish_date;`;

    pool.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

/*
 * Updates the approval_status enum of a notice
 * @param {number} [id] id of the notice to update
 * @param {number} [status] status to set
 * @returns {Promise<any>}
 */
db.setNoticeStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE notices
    SET approval_status = ?
    WHERE notice_id = ?`;

    pool.query(sql, [status, id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// Groups

/*
 * Returns an Array containing all groups from the database
 * @returns {Promise<GroupList[]>}
 */
db.getGroups = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT grouping_id AS id, section_id AS section, name  FROM groupings
    WHERE grouping_id > 0
    ORDER BY section_id, name`;

    pool.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      var array = results,
        result = array.reduce((r, { section: section, ...object }) => {
          var temp = r.find((o) => o.section === section);
          if (!temp) r.push((temp = { section, groups: [] }));
          temp.groups.push(object);
          return r;
        }, []);

      return resolve(result);
    });
  });
};

/*
 * Updates the name of a group
 * @param {number} [id] id of group to change
 * @param {string} [name] name to set
 * @returns {Promise<any>}
 */
db.setGroupName = (id, name) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE groupings
    SET name = ?
    WHERE grouping_id = ?`;

    pool.query(sql, [name, id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

/*
 * Deletes a group from the database if possible (recursive == false) or
 * Deletes all notices within a group and the group itself (recursive == true)
 *
 * @param {number} [id] id of group to delete
 * @param {boolean} [recursive] whether to remove all references to the group instead of a group itself
 * @returns {Promise<any>}
 */
db.deleteGroup = (id, recursive) => {
  return new Promise((resolve, reject) => {
    let sql = recursive
      ? `CALL groupsDeleteRecursive(?);`
      : `DELETE from groupings
    WHERE grouping_id = ?`;

    pool.query(sql, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

/*
 * Inserts a new group into the `groupings` table with the passed information
 * @param {number} [section] id of the section under which the group falls
 * @param {string} [name] group's name
 * @returns {Promise<any>}
 */
db.addGroup = (section, name) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO groupings (section_id, name) VALUES (?, ?)`;

    pool.query(sql, [section, name], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// Sections

/*
 * Returns an Array containing all sections from the database
 * @returns {Promise<SectionInfo[]>}
 */
db.getSections = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT section_id AS id, name
    FROM sections
    ORDER BY section_id`;

    pool.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// New

/*
 * Inserts a new notice into the `notices` table according to the information passed
    If Staff – sets approval_status to “Pending”
    If Admin – sets approval_status to “Approved”
 * @param {number} [userID] id of the user who generated the notice
 * @param {string} [displayDate] notice’s display date
 * @param {number} [groupingID] notice’s grouping_id
 * @param {string} [title] notice’s title
 * @param {string} [description] notice’s description
 * @param {number} [rights] user’s authorisation rights
 * @returns {Promise<any>}
 */
db.newNotice = (
  userID,
  displayDate,
  groupingID,
  title,
  description,
  rights
) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO notices (user_id, publish_date, display_date, grouping_id, title, description, approval_status)
      VALUES (?, now(), ?, ?, ?, ?, ?);`;

    let status = rights >= 3 ? 3 : 1;

    pool.query(
      sql,
      [userID, displayDate, groupingID, title, description, status],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

/*
 * Returns number storing the LAST_INSERT_ID() from the database
 * @returns {Promise<number>}
 */
db.getLastNoticeID = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT LAST_INSERT_ID() AS id;`;
    pool.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0].id);
    });
  });
};

/*
 * Iterates through the idsToMention string to insert relevant tuples into the `mentions` table
 * @param {number} [noticeID] id of notice which mentions students
 * @param {string} [idsToMention] comma-separated ids of students to tag in the notice
 * @returns {Promise<any>}
 */
db.tagStudents = (noticeID, idsToMention) => {
  return new Promise((resolve, reject) => {
    let sql = `CALL tagStudents(?, ?)`;
    pool.query(sql, [noticeID, idsToMention], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

/*
 * Returns an Array containing all students from the database
 * @returns {Promise<Student[]>}
 */
db.getStudents = () => {
  let sql = `SELECT
              students.user_id AS id,
              users.first_name AS firstname,
              users.surname
            FROM students
              INNER JOIN users
                ON students.user_id = users.user_id
            ORDER BY users.surname`;

  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// Export

/*
 * Returns an Array containing approved notices which satisfy the criteria passed
 * @param {string} [date] display_date by which to filter notices
 * @param {string} [sections] comma-separated ids of sections by which to filter notices
 * @returns {Promise<PrintList[]>}
 */
db.exportNotices = (date, sections) => {
  let sql = `SELECT
              notices.title,
              notices.description,
              groupings.section_id AS section
            FROM notices
              INNER JOIN groupings
                ON notices.grouping_id = groupings.grouping_id
            WHERE notices.display_date = ?
            AND notices.approval_status = 3
            AND groupings.section_id IN (${sections})
            ORDER BY groupings.section_id`;

  return new Promise((resolve, reject) => {
    pool.query(sql, [date], (err, results) => {
      if (err) {
        return reject(err);
      }
      var array = results,
        result = array.reduce((r, { section: section, ...object }) => {
          var temp = r.find((o) => o.section === section);
          if (!temp) r.push((temp = { section, notices: [] }));
          temp.notices.push(object);
          return r;
        }, []);
      return resolve(result);
    });
  });
};
// Feed

/*
 * Returns an Array containing approved notices which either
 *  fall under the user’s subscription groups,
 *  mention the user, or
 *  have not been placed in any specific predefined group
 *  (as will likely be the case for Restrictions, To See Staff, and Sanatorium notices)
 * @param {number} [userID] id of user whose feed to return
 * @returns {Promise<Feed[]>}
 */
db.getFeed = (userID) => {
  return new Promise((resolve, reject) => {
    let sql = `(SELECT notices.notice_id AS id, display_date, title, description, groupings.section_id AS section, notices.grouping_id, sections.sort_order
      FROM subscriptions, notices, groupings, sections
      WHERE subscriptions.user_id = ?
      AND subscriptions.grouping_id = notices.grouping_id
      AND groupings.grouping_id = notices.grouping_id
      AND groupings.section_id = sections.section_id
      AND notices.approval_status = 1)
      UNION
      
      (SELECT notices.notice_id AS id, display_date, title, description, groupings.section_id AS section, notices.grouping_id, sections.sort_order
      FROM mentions, notices, groupings, sections
      WHERE mentions.user_id = ?
      AND mentions.notice_id = notices.notice_id
      AND groupings.grouping_id = notices.grouping_id
      AND groupings.section_id = sections.section_id
      AND notices.approval_status = 1)
      UNION
      (SELECT notices.notice_id AS id, display_date, title, description, groupings.section_id AS section, notices.grouping_id, sections.sort_order
      FROM notices, groupings, sections
      WHERE notices.grouping_id < 0
      AND groupings.grouping_id = notices.grouping_id
      AND groupings.section_id = sections.section_id
      AND notices.approval_status = 1)
      ORDER BY sort_order, display_date;`;
    pool.query(sql, [userID, userID], (err, results) => {
      if (err) {
        return reject(err);
      }
      var array = results,
        result = array.reduce((r, { section: section, ...object }) => {
          var temp = r.find((o) => o.section === section);
          if (!temp) r.push((temp = { section, notices: [] }));
          temp.notices.push(object);
          return r;
        }, []);
      return resolve(result);
    });
  });
};

/*
 * Returns an Array containing groups from the database to which the user has and has not subscribed (in that order),
 * with the first element representing the number of subscriptions.
 * @param {number} [userID] id of user whose subscriptions to return
 * @returns {Promise<NoticeGroup[]>}
 */
db.getSubGroups = (userID) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT
      COUNT(groupings.name) AS name, COUNT(groupings.grouping_id) AS id
    FROM groupings
      INNER JOIN subscriptions
        ON subscriptions.grouping_id = groupings.grouping_id
      INNER JOIN users
        ON subscriptions.user_id = users.user_id
    WHERE subscriptions.user_id = ?
    UNION
    SELECT
      groupings.name, groupings.grouping_id
    FROM groupings
      INNER JOIN subscriptions
        ON subscriptions.grouping_id = groupings.grouping_id
      INNER JOIN users
        ON subscriptions.user_id = users.user_id
    WHERE subscriptions.user_id = ?
    UNION
    SELECT
      groupings.name, grouping_id
    FROM  groupings
    WHERE grouping_id > 0;`;

    pool.query(sql, [userID, userID, userID], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

/*
 * Iterates through the subsToAdd string to insert relevant tuples into the `subscriptions` table
 * @param {number} [userID] id of user whose subscriptions to insert
 * @param {string} [subsToAdd] comma-separated ids of groups to insert
 * @returns {Promise<any>}
 */
db.addSubs = (userID, subsToAdd) => {
  return new Promise((resolve, reject) => {
    let sql = `CALL addSubs(?, ?)`;

    pool.query(sql, [userID, subsToAdd], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

/*
 * Iterates through the subsToDel string to delete relevant tuples from the `subscriptions` table
 * @param {number} [userID] id of user whose subscriptions to delete
 * @param {string} [subsToDel] comma-separated ids of groups to delete
 * @returns {Promise<any>}
 */
db.deleteSubs = (userID, subsToDel) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE from subscriptions
    WHERE user_id = ? 
    AND grouping_id IN (${subsToDel});`;

    pool.query(sql, [userID], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// All

/*
 * Returns an Array containing all approved notices from the database
 * @returns {Promise<AllNotice[]>}
 */
db.getAll = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT
    notices.notice_id AS id,
    notices.display_date,
    groupings.name AS grouping_name,
    notices.title,
    notices.description,
    notices.user_id AS userID
    FROM notices
    INNER JOIN groupings
    ON notices.grouping_id = groupings.grouping_id
    # WHERE notices.approval_status = 3
    ORDER BY notices.display_date;`;
    pool.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// db.userByID = (id) => {
//   return new Promise((resolve, reject) => {
//     let sql = `SELECT * from users WHERE user_id = ?`;
//     pool.query(sql, id, (err, results) => {
//       if (err) {
//         return reject(err);
//       }
//       return resolve(results);
//     });
//   });
// };

// General

/*
 * Updates the title and/or description of a notice
    If Staff – sets approval_status to “Pending”
 * @param {number} [id] id of notice to edit
 * @param {string} [title] title to set
 * @param {string} [description] description to set
 * @param {number} [rights] user’s authorisation rights
 * @returns {Promise<any>}
 */
db.editNotice = (id, title, description, rights) => {
  return new Promise((resolve, reject) => {
    let sql = `CALL editNotice(?, ?, ?, ?);`;
    pool.query(sql, [id, title, description, rights], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// Authentication

/*
 * Returns an jwt containing
 *  the user’s details from the database
 *  and a token thereof
 * if the credentials passed are valid
 * @param {string} [username] user's username
 * @param {string} [password] user's password
 * @returns {Promise<any>}
 */
db.login = (username, password) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT user_id AS id, rights+0 AS rights, first_name, surname, username, password from users
              WHERE username = ?`;
    pool.query(sql, [username], (err, results) => {
      if (err || !results.length) {
        return reject("Invalid credentials");
      }
      let user = results[0];
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          delete user.password;
          let payload = { subject: user };
          let token = jwt.sign(payload, "placeholderKey");
          return resolve({
            token,
            user: user,
          });
        }
        return reject("Invalid credentials");
      });
    });
  });
};

/*
 * Returns an jwt containing
 *  the student's details from the database
 *  and a token thereof
 * if the admin number passed is valid
 * @param {number} [adminNo] student's admin number
 * @returns {Promise<any>}
 */
db.mobileLogin = (adminNo) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT users.user_id AS id, first_name, surname
              from users, students
              WHERE users.user_id = students.user_id
              AND students.admin_no = ?`;
    pool.query(sql, [adminNo], (err, results) => {
      if (err || !results.length) {
        return reject("Invalid credentials");
      }
      let user = results[0];
      let payload = { subject: user };
      let token = jwt.sign(payload, "placeholderKey");
      return resolve({
        token,
        user: user,
      });
    });
  });
};

/*
 * Updates the password field of a user’s tuple in the `users` table
 * if the credentials passed are valid
 * @param {string} [username] user's username
 * @param {string} [oldPassword] user's old password to change
 * @param {string} [newPassword] user's new desired password
 * @returns {Promise<any>}
 */
db.changePassword = (username, oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT user_id AS id, password from users
    WHERE username = ?`;
    let user;
    pool.query(sql, [username], (selectErr, selectRes) => {
      if (selectErr || !selectRes.length) {
        return reject("Invalid credentials");
      }
      user = selectRes[0];
      if (bcrypt.compareSync(oldPassword, user.password)) {
        let hash = bcrypt.hashSync(newPassword, 12);
        let sqlB = `UPDATE users
            SET password = ?
            WHERE username = ?`;
        pool.query(sqlB, [hash, username], (updateErr, updateRes) => {
          if (updateErr) {
            return reject(updateErr);
          }
          return resolve(updateRes);
        });
      } else {
        return reject("Invalid credentials");
      }
    });
  });
};

module.exports = db;
