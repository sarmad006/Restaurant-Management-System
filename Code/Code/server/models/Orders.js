const db=require('../connection/db')

let sql;
sql = " CREATE TABLE IF NOT EXISTS orders (order_id INT auto_increment primary key,customer_id INT,REM_AMOUNT INT,PAID_AMOUNT INT,STATUS VARCHAR(20) DEFAULT 'PENDING',order_date Date,order_time Time,order_method varchar(20),rating INT, CONSTRAINT FK_customer_id FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE SET NULL)";
 db.query(sql, function (err, result) {
    if (err) throw err;
  });