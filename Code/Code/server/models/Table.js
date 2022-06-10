const db=require('../connection/db')

let sql;
sql = " CREATE TABLE IF NOT EXISTS Reserve_tables(table_id INT auto_increment primary key,chairs INT,customer_id INT,STATUS VARCHAR(20) DEFAULT 'UNRESERVED',START_DATE TIME,END_DATE TIME, CONSTRAINT FK_customerTable_id FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE SET NULL)";
 db.query(sql, function (err, result) {
    if (err) throw err;
  });