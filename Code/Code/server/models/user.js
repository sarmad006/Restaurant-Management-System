const db=require('../connection/db')

let sql;
sql = " CREATE TABLE IF NOT EXISTS customer (Customer_id INT AUTO_INCREMENT PRIMARY KEY ,USERNAME VARCHAR(20) UNIQUE , password VARCHAR(500) NOT NULL, fname varchar(20), lname varchar(20), phoneNumber varchar(11))";
 db.query(sql, function (err, result) {
    if (err) throw err;
  });