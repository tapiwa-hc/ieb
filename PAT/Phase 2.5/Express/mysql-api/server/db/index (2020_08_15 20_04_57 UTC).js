const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'ltS^Cf39Ppvr',
  user: 'root',
  database: 'pat_sandbox',
  host: 'localhost',
  port: '3306'
});

let patDB = {};

patDB.all = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * from notices
    WHERE notice_id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// Pending
patDB.pendingShow = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT
        notices.notice_id AS id,
        notices.display_date,
        groupings.name,
        notices.title,
        notices.description,
        CONCAT(LEFT(users.first_name, 1), " ", users.surname) AS user
      FROM notices
        INNER JOIN users
          ON notices.user_id = users.user_id
        INNER JOIN groupings
          ON notices.grouping_id = groupings.grouping_id
      WHERE notices.approval_status = 'Pending'
      ORDER BY notices.publish_date`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
  });
};

patDB.pendingStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE notices
    SET approval_status = ?
    WHERE notice_id = ?`
    pool.query(sql, [status, id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};




// Groups

patDB.groupsShow = () => {
  return new Promise((resolve, reject) => {
    
    let sql = `SELECT groupings.* FROM groupings
    WHERE groupings.grouping_id > 0
    ORDER BY groupings.section_id`;
    
    pool.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

patDB.groupsEdit = (id, name) => {
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

patDB.userByID = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * from users WHERE user_id = ?`, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

patDB.allNotices = () => {
  return new Promise((resolve, reject) => {
    pool.query( // TODO: check necessity of formatting
      `SELECT
      DATE_FORMAT(notices.display_date, "%e %b") AS Date,
      groupings.name AS \`Group\`,
      notices.title AS Title,
      notices.description AS Description
      FROM notices
      INNER JOIN groupings
      ON notices.grouping_id = groupings.grouping_id`,
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  };

  patDB.subsShow = (userID) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT
      groupings.name
      FROM subscriptions
      INNER JOIN groupings
      ON subscriptions.grouping_id = groupings.grouping_id
  WHERE subscriptions.user_id = ?`, userID, (err, results) => {
    if (err) {
      return reject(err);
    }
      return resolve(results);
    });
  });
};

// General

patDB.editNotice = (id, title, description) => {
  return new Promise((resolve, reject) => {
    let sql = `CALL editNotice(?, ?, ?);`;
    pool.query(sql, [id, title, description], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};
module.exports = patDB;