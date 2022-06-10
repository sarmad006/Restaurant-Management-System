const db=require('../connection/db')

let sql;
sql = " CREATE TABLE IF NOT EXISTS root (ADMIN_ID INT AUTO_INCREMENT PRIMARY KEY,USERNAME VARCHAR(20) , password VARCHAR(20) NOT NULL)";
 db.query(sql, function (err, result) {
    if (err) throw err;
  });

  const user="admin";
  const key="fast123";

  sql = `INSERT IGNORE INTO  root(USERNAME, password) values ('${user}','${key}')` ;
 db.query(sql, function (err, result) {
    if (err) throw err;
  });


