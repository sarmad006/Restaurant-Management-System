const db=require('../connection/db')

let sql;
sql = " CREATE TABLE IF NOT EXISTS admin_items (items_id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(20) , subheader VARCHAR(20) NOT NULL,Price INT,src varchar(10))";
 db.query(sql, function (err, result) {
    if (err) throw err;
  });


  sql = `INSERT IGNORE INTO admin_items(items_id,title, subheader,Price,src) values ('1','Biryani','Chicken','120','/3464.jpg')` ;
  db.query(sql, function (err, result) {
     if (err) throw err;
   });

   sql = `INSERT IGNORE INTO admin_items(items_id,title, subheader,Price,src) values ('2','Karahi','Beef','1200','/3465.jpg')` ;
  db.query(sql, function (err, result) {
     if (err) throw err;
   });

   sql = `INSERT IGNORE INTO admin_items(items_id,title, subheader,Price,src) values ('3','Zinger Burger','Beef','400','/3466.jpg')` ;
  db.query(sql, function (err, result) {
     if (err) throw err;
   });

   sql = `INSERT IGNORE INTO admin_items(items_id,title, subheader,Price,src) values ('4','Pizza','Fajita','600','/3467.jpg')` ;
  db.query(sql, function (err, result) {
     if (err) throw err;
   });

   sql = `INSERT IGNORE INTO admin_items(items_id,title, subheader,Price,src) values ('5','Pasta','Tomato spinach','900','/3468.jpg')` ;
   db.query(sql, function (err, result) {
      if (err) throw err;
    });

    sql = `INSERT IGNORE INTO admin_items(items_id,title, subheader,Price,src) values ('6','French Fries','Potato','80','/3469.jpg')` ;
   db.query(sql, function (err, result) {
      if (err) throw err;
    });

    sql = `INSERT IGNORE INTO admin_items(items_id,title, subheader,Price,src) values ('7','Handi','Mutton','1400','/3470.jpg')` ;
   db.query(sql, function (err, result) {
      if (err) throw err;
    });

    sql = `INSERT IGNORE INTO admin_items(items_id,title, subheader,Price,src) values ('8','Macroni','Mutton Masala','700','/3471.jpg')` ;
    db.query(sql, function (err, result) {
       if (err) throw err;
     });
 

