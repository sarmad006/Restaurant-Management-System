const db=require('../connection/db')

let sql;
sql = " CREATE TABLE IF NOT EXISTS customer_items (cust_items_id INT ,customer_id INT,CONSTRAINT FK_items_id FOREIGN KEY (cust_items_id) REFERENCES admin_items(items_id) ON DELETE SET NULL,CONSTRAINT FK_cust_id FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE SET NULL )";
 db.query(sql, function (err, result) {
    if (err) throw err;
  });
