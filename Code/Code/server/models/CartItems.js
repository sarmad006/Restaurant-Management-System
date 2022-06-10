const db=require('../connection/db')

let sql;
sql = " CREATE TABLE IF NOT EXISTS cart_items (cust_items_id INT ,order_id INT,CONSTRAINT FK_customer__itemsid FOREIGN KEY (cust_items_id) REFERENCES admin_items(items_id) ON DELETE SET NULL ,CONSTRAINT FK_orderCart_id FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE SET NULL )";
 db.query(sql, function (err, result) {
    if (err) throw err;
  });
