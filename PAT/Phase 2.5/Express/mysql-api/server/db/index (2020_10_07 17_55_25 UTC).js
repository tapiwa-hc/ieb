const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  password: 'ltS^Cf39Ppvr',
  user: 'root',
  database: 'pat_sandbox',
  host: 'localhost',
  port: '3306'
});

let db = {};

// Pending
db.getPending = () => {
  return new Promise((resolve, reject) => {
    
    let sql = 
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
    ORDER BY notices.publish_date;`;

    pool.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

db.pendingStatus = (id, status) => {
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
db.groupsShow = () => {
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
          var temp = r.find(o => o.section === section);
          if (!temp) r.push(temp = { section, groups: [] });
          temp.groups.push(object);
          return r;
        }, []);
      // console.log(result);
      return resolve(result);
    });
  });
};

db.groupsEdit = (id, name) => {
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

db.groupsDelete = (id, recursive) => {
  return new Promise((resolve, reject) => {
    
    let sql = recursive ?
    `CALL groupsDeleteRecursive(?);`
    :`DELETE from groupings
    WHERE grouping_id = ?`;

    pool.query(sql, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });

};

db.groupsNew = (section, name) => {
  return new Promise ((resolve, reject) => {

    let sql = `INSERT INTO groupings (section_id, name) VALUES (?, ?)`;

    pool.query(sql, [section, name], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}
// Sections
db.sectionsShow = () => {
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
// TODO: Decide on auth type
db.newNotice = (userID, displayDate, groupingID, title, description) => {
  return new Promise((resolve, reject) => {

    let sql = `INSERT INTO notices (user_id, publish_date, display_date, grouping_id, title, description)
      VALUES (?, now(), ?, ?, ?, ?);`;

    pool.query(sql, [userID, displayDate, groupingID, title, description], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

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

db.tagStudents = (noticeID, idsToMention) => {
  return new Promise((resolve, reject) => {
    let sql = `CALL tagStudents(?, ?)`;
    pool.query(sql, [noticeID, idsToMention], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  })
};
  
db.getStudents = () => {
  let sql = `SELECT
              students.user_id AS id,
              users.first_name AS firstname,
              users.surname
            FROM students
              INNER JOIN users
                ON students.user_id = users.user_id
            ORDER BY users.surname
            LIMIT 5`;

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
db.exportNotices = (date, sections) => {
  let sql = `SELECT
              notices.title,
              notices.description,
              groupings.section_id AS section
            FROM notices
              INNER JOIN groupings
                ON notices.grouping_id = groupings.grouping_id
            WHERE notices.display_date = ?
            AND notices.approval_status = 1
            AND groupings.section_id IN (${sections})
            ORDER BY groupings.section_id`; // TODO: change approval_status to 3

  return new Promise((resolve, reject) => {
    pool.query(sql, [date], (err, results) => {
      if (err) {
        return reject(err);
      }
      var array = results,
      result = array.reduce((r, { section: section, ...object }) => {
        var temp = r.find(o => o.section === section);
        if (!temp) r.push(temp = { section, notices: [] });
        temp.notices.push(object);
        return r;
      }, []);
      return resolve(result);
    });
  });
}
// Feed
db.getMyNotices = (userID) => {
  return new Promise((resolve, reject) => {
    let sql = `(SELECT notices.notice_id AS id, display_date, title, description, groupings.section_id AS section, notices.grouping_id
      FROM subscriptions, notices, groupings
      WHERE subscriptions.user_id = ?
      AND subscriptions.grouping_id = notices.grouping_id
      AND groupings.grouping_id = notices.grouping_id
      AND notices.approval_status = 1)
      UNION
      
      (SELECT notices.notice_id AS id, display_date, title, description, groupings.section_id AS section, notices.grouping_id
      FROM mentions, notices, groupings
      WHERE mentions.user_id = ?
      AND mentions.notice_id = notices.notice_id
      AND groupings.grouping_id = notices.grouping_id
      AND notices.approval_status = 1)
      ORDER BY display_date;`; // TODO Approval Status, Negative Groups
      pool.query(sql, [userID, userID], (err, results) => {
        if (err) {
          return reject(err)
        }
        var array = results,
        result = array.reduce((r, { section: section, ...object }) => {
          var temp = r.find(o => o.section === section);
          if (!temp) r.push(temp = { section, notices: [] });
          temp.notices.push(object);
          return r;
        }, []);
        return resolve(result);
      })
  })
}

db.getSubscriptions = (userID) => {
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
    })

  });

}

db.addSubs = (userID, subsToAdd) => {
  return new Promise((resolve, reject) => {
    let sql = `CALL addSubs(?, ?)`;

    pool.query(sql, [userID, subsToAdd], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    })
  });
}

db.unSub = (userID, subsToRemove) => {
  return new Promise((resolve, reject) => {
    let sql = `DELETE from subscriptions
    WHERE user_id = ? 
    AND grouping_id IN (${subsToRemove});`;

    pool.query(sql, [userID], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    })
  });
}
// All
db.getAll = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT
    notices.notice_id AS id,
    notices.display_date,
    groupings.name,
    notices.title,
    notices.description
    FROM notices
    INNER JOIN groupings
    ON notices.grouping_id = groupings.grouping_id
    # WHERE notices.approval_status = 'Approved'
    ORDER BY notices.display_date;`; // TODO: Uncomment Where clause
    pool.query(sql, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

db.userByID = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * from users WHERE user_id = ?`;
    pool.query(sql, id, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

/* db.subsShow = (userID) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT
    groupings.name
    FROM subscriptions
    INNER JOIN groupings
    ON subscriptions.grouping_id = groupings.grouping_id
    WHERE subscriptions.user_id = ?`;
    pool.query(sql, userID, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}; */
// General
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
db.login = (username, password) => {
  return new Promise( (resolve, reject) => {
    let sql = `SELECT user_id AS id, rights+0 AS rights, first_name, surname, username, password from users
              WHERE username = ?`;
    pool.query(sql, [username], (err, results) => {
      if (err || !results.length) {
        return reject("Invalid credentials")
      }
      let user = results[0];
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          let payload = {subject: user}
          let token = jwt.sign(payload, "placeholderKey")
          return resolve({
            token,
            rights: user.rights,
            id: user.id
          });
        }
        return reject("Invalid credentials")
      })
      
    })
  })
}

// db.changePassword = (username, oldPassword, newPassword) => {
//   return new Promise((resolve, reject) => {
//     let sql = `SELECT user_id AS id, password from users
//     WHERE username = ?`;
//     let user;
//     pool.query(sql, [username], (selectErr, selectRes) => {
//       if (selectErr || !selectRes.length) {
//         return reject("aInvalid credentials")
//       }
//       user = selectRes[0];
//       bcrypt.compare(oldPassword, user.password, (compareErr, compareRes) => {
//         console.log("trying to compare...")
//         console.log(compareRes);
//         if (compareRes) {
//           bcrypt.hash(newPassword, 12, (hashErr, hashRes) => {
//             console.log("trying to hash...")
//             if (hashErr) {
//               return reject(hashErr);
//             }
//             let sqlB = `UPDATE users
//             SET password = ?
//             WHERE username = ?`;
//             pool.query(sqlB, [hashRes, username], (updateErr, updateRes) => {
//               if (updateErr) {
//                 console.log('hit a snag')
//                 return reject(updateErr);
//               }
//               console.log('no problems yet')
//               return resolve(updateRes);
//             })
//           })
//         }
//         return reject("bInvalid credentials")
//       })
//     })
//   })
// }

db.changePassword = (username, oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT user_id AS id, password from users
    WHERE username = ?`;
    let user;
    pool.query(sql, [username], (selectErr, selectRes) => {
      if (selectErr || !selectRes.length) {
        return reject("Invalid credentials")
      }
      user = selectRes[0];
      if(bcrypt.compareSync(oldPassword, user.password)) {
        let hash = bcrypt.hashSync(newPassword, 12);
        let sqlB = `UPDATE users
            SET password = ?
            WHERE username = ?`;
        pool.query(sqlB, [hash, username], (updateErr, updateRes) => {
          if (updateErr) {
            return reject(updateErr);
          }
          return resolve(updateRes);
        })
      } else {
        return reject("Invalid credentials")
      }
    })
  })
}

module.exports = db;