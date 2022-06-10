const db=require('../connection/db')

let sql;
sql = " CREATE TABLE IF NOT EXISTS Complains (Complain_ID INT AUTO_INCREMENT PRIMARY KEY,customer_id INT,order_ID INT,Complain_user VARCHAR(200),rep_admin varchar(200),CONSTRAINT FK_customerComplain_id FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE SET NULL,CONSTRAINT FK_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE SET NULL)";
 db.query(sql, function (err, result) {
    if (err) throw err;
  });