const express=require('express')
const bodyparser=require('body-parser')
const admin=require('../server/models/admin')
const customer=require('../server/models/user')
const db=require('../server/connection/db')
const adminitems=require('../server/models/adminItems')
const customeritems=require('../server/models/customerItems')
const orders=require('../server/models/Orders')
const Table=require('../server/models/Table')
const complain=require('../server/models/Complains')
const cartItems=require('../server/models/CartItems')

const app=express();
const bcrypt=require('bcrypt');
const saltround=10;
const cors=require('cors');
const accountSid = 'AC2aa2cdf168dff443619b60358b5f6d66' ;
const authToken = '32a8cbfbb4c2b1a4983e4aee6c4c44f2' ;
const client = require('twilio')(accountSid, authToken); 
/* const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var session;



const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser()); */





app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}))

//admin credentials

//admin login
app.get("/admin/login/get" ,(req,res)=>{
    const sql="select * from root";
    db.query(sql,(err,result)=>{
        if(err) 
        res.send({message:"Kindly try again later"});
        else
        res.send(result);
      })
})

//adminHome
app.get('/admin/home',(req,res)=>{
  const sql="Select count(customer_id) as totalCustomer from customer";
  db.query(sql,(err,result)=>{
      if(err) 
      res.send({message:"Reload the page"});
      else
      res.send(result);
  })  
})

app.get('/admin/home/table',(req,res)=>{
  const sql="Select count(table_id) as totalTable from reserve_tables";
  db.query(sql,(err,result)=>{
      if(err) 
      res.send({message:"Reload the page"});
      else
      res.send(result);
  })  
})


//adminItems
app.get('/admin/items',(req,res)=>{
  
         
  const sql="Select * from admin_items";
  db.query(sql,(err,result)=>{
      if(err) 
      res.send({message:"Kindly try again Later"});
      else
      res.send(result);
  })
  
  })

  //Update Admin Items Price
  app.put('/items/update',(req,res)=>{
  
    const id=req.query.id;
    const price=req.body.Price;
   
  
    
    var sqlquery="UPDATE admin_items SET Price=? where items_id=?";
    db.query(sqlquery,[price,id],(err,result)=>{
      if(err) 
      res.send({message:"Error updating price"});
      else
      res.send(result.length);
      
    })
  
  })


  //showing orders to admin
  app.get('/admin/order/get/dineIN',(req,res)=>{
    var sqlquery="Select * from orders,customer,Reserve_tables where (orders.status='PENDING' and order_method='DINE-IN') and (orders.customer_id=customer.Customer_id and customer.Customer_id=Reserve_tables.customer_id )";
    db.query(sqlquery,(err,result)=>{
       if(err) 
       console.log(err);
       else
       res.send(result)
       
     })
})

app.get('/admin/order/get/delivery',(req,res)=>{
  var sqlquery="Select * from orders,customer where (status='Pending' and order_method='Delivery') and orders.customer_id=customer.customer_id";
  db.query(sqlquery,(err,result)=>{
     if(err) 
     res.send({message:"Error getting orders"});
     else
     res.send(result)
     
   })
})

app.get('/admin/orderhistory/get',(req,res)=>{
  var sqlquery="Select * from orders,customer where orders.status='Delivered' and orders.customer_id=customer.customer_id";
  db.query(sqlquery,(err,result)=>{
     if(err) 
     res.send({message:"error getting orders"})
     else
     res.send(result)
     
   })
})

//admin approving orders
app.put('/admin/order/post',(req,res)=>{


  const order_id=req.body.order_id;
  const bill=req.body.bill;
  const name=req.body.fname;

  

   client.messages
  .create({
     body: "Dear " + name + " Your Order with Order ID " + order_id + " has been Approved , Your Bill is Rs " + bill ,
     from: '+12344075058',
     to: '+923090710374'
   })
  .then(message => console.log(message.sid)); 
  var sqlquery="Update orders SET status='Delivered'where order_id=?";
  db.query(sqlquery,order_id,(err,result)=>{
     if(err) 
     res.send({message:"Eror updating orders"});
  
     
   })
})

//admin canceling Orders
app.put('/admin/orders/cancel/post',(req,res)=>{
  const order_id=req.body.order_id;
  //console.log(order_id);
  var sqlquery="Update orders SET status='Cancel' where order_id=?";
  db.query(sqlquery,order_id,(err,result)=>{
    if(err) 
    res.send({message:"ERROR cancelling orders"});
 
    
  })

})

//admin adding tables
app.post('/admin/createtable',(req,res)=>{
  const chairs_no = req.body.chairs;
  //console.log(chairs_no);
  var sqlquery="INSERT INTO RESERVE_TABLES(chairs) values (?)";
  db.query(sqlquery,chairs_no,(err,result)=>{
    if(err) 
    res.send({message:"Error Adding table"});
  
    
  })
  
  })


  //admin viewing all the tables
  app.get('/admin/viewTables',(req,res)=>{
    var sqlquery="Select * from reserve_tables where status='UNRESERVED' ";
    db.query(sqlquery,(err,result)=>{
      if(err) 
      //console.log(err);
      res.send({message:"Reload the page"});
    else
    res.send(result);
      
    })
  
  })

  //admin deleting tables
  app.delete('/admin/deleteTables',(req,res)=>{
  const table_id=req.body.table_id;
  //console.log(table_id);
  var sqlquery="Delete from reserve_tables where table_id=?";
  db.query(sqlquery,table_id,(err,result)=>{
    if(err) 
    res.send({message:"Error deleting the table"});
  
    
  })
  
  })

  //admin updating chairs
  app.put('/admin/UpdateChairs',(req,res)=>{
  const table_id=req.body.table_id;
  const chairs=req.body.chairs;
  //console.log(chairs,table_id);
  var sqlquery="Update reserve_tables set chairs=? where table_id=?";
  db.query(sqlquery,[chairs,table_id],(err,result)=>{
    if(err) 
    res.send({message:"Error updating the chairs"});
  
    
  })
  
  })


  app.get('/admin/PendingTables',(req,res)=>{
    
   
     
    var sqlquery="SELECT * FROM RESERVE_TABLES WHERE STATUS='PENDING'";
    
    db.query(sqlquery,(err,result)=>{
      if(err) 
      //console.log(err);
      res.send({message:err.sqlMessage});
      else
      res.send(result);
    
      
    })
    
    })

    app.put('/admin/tableApprove',(req,res)=>{
    
   
     const table_id=req.body.table_id;
      var sqlquery="Update reserve_tables set STATUS='RESERVED' where table_id=?";
      
      db.query(sqlquery,table_id,(err,result)=>{
        if(err) 
        //console.log(err);
        res.send({message:err.sqlMessage});
        //else
        //console.log(result);
      
        
      })
      
      })

      app.put('/admin/tableCancel',(req,res)=>{
    
   
        const table_id=req.body.table_id;
         var sqlquery="Update reserve_tables set status='UNRESERVED' where table_id=?";
         
         db.query(sqlquery,table_id,(err,result)=>{
           if(err) 
           //console.log(err);
           res.send({message:err.sqlMessage});
           
         
           
         })
         
         })

         app.put('/admin/tableUnbooked',(req,res)=>{
    
   
          const table_id=req.body.table_id;
           var sqlquery="Update reserve_tables set status='UNRESERVED',customer_id=null where table_id=?";
           
           db.query(sqlquery,table_id,(err,result)=>{
             if(err) 
             //console.log(err);
             res.send({message:err.sqlMessage});
             
           
             
           })
           
           })


         app.put('/admin/tables/unreserved',(req,res)=>{
          const order_id=req.body.order_id;
          //console.log(order_id);
          var sqlquery="Update reserve_tables SET status='UNRESERVED',customer_id=null where customer_id=(select customer_id from orders where order_id=?)";
          db.query(sqlquery,order_id,(err,result)=>{
            if(err) 
            //console.log(err);
            res.send({message:err.sqlMessage});

         })
        })


        app.get('/admin/registeredCustomer',(req,res)=>{
          
          //console.log(order_id);
          var sqlquery="Select * from customer";
          db.query(sqlquery,(err,result)=>{
            if(err) 
            //console.log(err);
            res.send({message:err.sqlMessage});
            else
            res.send(result);

         })
        })
   
        
  app.get('/admin/BookedTables',(req,res)=>{
    
   
     
    var sqlquery="SELECT * FROM RESERVE_TABLES WHERE STATUS='RESERVED'";
    
    db.query(sqlquery,(err,result)=>{
      if(err) 
      //console.log(err);
      res.send({message:err.sqlMessage});
      else
      res.send(result);
    
      
    })
    
    })

    app.get('/admin/get/newComplains',(req,res)=>{
   
      var sqlquery="Select * from Complains where rep_admin is null";
       
    db.query(sqlquery,(err,result)=>{
      if(err) 
      //console.log(err);
      res.send({message:err.sqlMessage});
      else
      res.send(result);
    
      
    })

    })

    app.get('/admin/get/AllComplains',(req,res)=>{
   
      var sqlquery="Select * from Complains where rep_admin is not null";
       
    db.query(sqlquery,(err,result)=>{
      if(err) 
      //console.log(err);
      res.send({message:err.sqlMessage});
      else
      res.send(result);
    
      
    })

    })

    app.put('/admin/complain/reply',(req,res)=>{
   const Complain_ID=req.body.Complain_ID;
   const reply=req.body.reply;

      var sqlquery="Update Complains set rep_admin=? where Complain_ID=?";
       
    db.query(sqlquery,[reply,Complain_ID],(err,result)=>{
      if(err) 
      //console.log(err);
      res.send({message:err.sqlMessage});
      else
      res.send(result.length);
    
      
    })

    })
//customer credentials

//customer signup req
app.post("/user/signup/post",(req,res)=>{
    var username=req.body.username;
    var password=req.body.password;
    var fname=req.body.fname;
    var lname=req.body.lname;
    var phone=req.body.phone;
    //console.log(username,password,fname,lname,phone);
    
    bcrypt.hash(password,saltround,(err,hash)=>{
        if(err)
        console.log(err);
    const sql = "INSERT INTO CUSTOMER(USERNAME,password,fname,lname,phoneNumber) values(?,?,?,?,?)";
    db.query(sql,[username,hash,fname,lname,phone],(err,result)=>{
         if (err)
         {
            if(err.code=='ER_DATA_TOO_LONG') 
            {
            res.send({message:'Invalid Phone Number'})
            return;
            }
            if(err.code=='ER_DUP_ENTRY')
            {
            res.send({message:'Username is already taken'})
            return;
            }
            else 
             res.send({message:'Try again'})
             return;
          }
          else
          res.send(result);
          }) 
    })

 
   
})

// customer login req
app.post('/user/login/post',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    
    const sql = "Select USERNAME,password,CUSTOMER_ID from customer where username=?";
    db.query(sql,username,(err,result)=>{
            if(err) console.log(err);
            if(result.length>0)
            {
                
                bcrypt.compare(password,result[0].password,(err,response)=>{
                    if(response)
                    {
                     // session=req.session;
                       //session.userid=req.body.username;
                       //console.log(req.session);
                        res.send(result);
                    }
                    else
                res.send({message:"wrong username/password combination !"})
                     
                })
               
            }
            else{
                res.send({message:"user does not exist!"})
            }
            
          }) 
    

})




//taking customer data
app.get('/customer/home',(req,res)=>{
const id=req.query.id;

const sql="Select * from customer where CUSTOMER_ID=?";
db.query(sql,id,(err,result)=>{
    if(err) 
    res.send({message:'Please try Again Later'});
    else
    res.send(result);
})

})


//customer profile settings
app.put('/profile/update/fname',(req,res)=>{
    const id=req.query.id;
    const fname=req.body.fname;
    
   
    
    const sql="Update customer set fname=? where CUSTOMER_ID=?";
    db.query(sql,[fname,id],(err,result)=>{
        if(err) 
        res.send({message:"Error Updating Fname"});
        else
        console.log(result);
    })
    
    })

    app.put('/profile/update/lname',(req,res)=>{
      const id=req.query.id;
      const lname=req.body.lname;
      
     
      
      const sql="Update customer set lname=? where CUSTOMER_ID=?";
      db.query(sql,[lname,id],(err,result)=>{
          if(err) 
          res.send({message:"Error Updating Lname"})
          else
          console.log(result);
      })
      
      })

      app.put('/profile/update/phoneNo',(req,res)=>{
        const id=req.query.id;
        const phone=req.body.phone;
        
       
        
        const sql="Update customer set phoneNumber=? where CUSTOMER_ID=?";
        db.query(sql,[phone,id],(err,result)=>{
            if(err) 
            res.send({message:"Error Updating Phone No"})
            else
            console.log(result);
        })
        
        })

   app.delete('/user/delete',(req,res)=>{
    const id=req.query.id;
    //console.log(id);
    var sqlquery="Delete from customer where customer_id=?"
    db.query(sqlquery,id,(err,result)=>{
      if(err) 
      res.send({message:'Please Try again Later'})
      else
      res.sendStatus(200);
  })

   })


   //customer adding items     
  app.post('/customer/items',(req,res)=>{
   const cust_id=req.body.cust_id;
   const id=req.query.id;

   var sqlquery="INSERT INTO customer_items(cust_items_id,customer_id) values(?,?)";
   db.query(sqlquery,[cust_id,id],(err,result)=>{
     if(err) 
     res.send({message:"try again later"})

     
     
   })
})

//customer getting items
 app.get('/customer/items/get',(req,res)=>{
     const id=req.query.id;
     var sqlquery="Select items_id,title,price,customer_id from admin_items,customer_items where cust_items_id=items_id and customer_id=? ";
     db.query(sqlquery,id,(err,result)=>{
       if(err) 
       res.send({message:'Error Getting items try again later'});
       else 
       res.send(result);
       
     })

 })

 //customer deleting their items
 app.delete('/customer/items/delete',(req,res)=>{
    const id=req.query.id;
    
    var sqlquery="delete from customer_items where customer_id=? ";
    db.query(sqlquery,id,(err,result)=>{
      if(err) 
      res.send({message:"Error deleting items"});
      else 
      res.send(result);
      
    })

})

//generating customer bill
app.get('/customer/bill/get',(req,res)=>{
    const id=req.query.id;
    var sqlquery="Select fname,lname,price,phoneNumber from admin_items,customer_items,customer where (cust_items_id=items_id and customer.Customer_id=customer_items.customer_id ) and customer.Customer_id=? ";
    db.query(sqlquery,id,(err,result)=>{
      if(err) 
      res.send({message:"Error getting Bill"});
      else 
      res.send(result);
      
    })

})

//customer adding order
app.post('/customer/orders/post',(req,res)=>{
    const rem_amount=req.body.amount;
    const id=req.query.id;
    const paid_amount=req.body.bill;
    let date_ob = new Date();
  client.messages
  .create({
     body: 'Dear Customer your Order is processing',
     from: '+12344075058',
     to: '+923090710374'
   })
  .then(message => console.log(message.sid)); 

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();



// prints date & time in YYYY-MM-DD HH:MM:SS format
var createddate=year + "-" + month + "-" + date ;

var createTime=hours + ":" + minutes + ":" + seconds;
 
    var sqlquery="INSERT INTO orders(customer_id,REM_AMOUNT,PAID_AMOUNT,order_date,order_time,order_method) values(?,?,?,?,?,'DINE-IN')";
    db.query(sqlquery,[id,rem_amount,paid_amount,createddate,createTime],(err,result)=>{
      if(err) 
      res.send({message:"Bill does not pay sucessfully"});
      
      
    })
 })

 app.post('/customer/orders/post/delivery',(req,res)=>{
  const rem_amount=req.body.amount;
  const id=req.query.id;
  const paid_amount=req.body.bill;
  let date_ob = new Date();
   client.messages
  .create({
     body: 'Dear Customer your Order is processing',
     from: '+12344075058',
     to: '+923090710374'
   })
  .then(message => console.log(message.sid));   
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();



// prints date & time in YYYY-MM-DD HH:MM:SS format
var createddate=year + "-" + month + "-" + date ;

var createTime=hours + ":" + minutes + ":" + seconds;


  var sqlquery="INSERT INTO orders(customer_id,REM_AMOUNT,PAID_AMOUNT,order_date,order_time,order_method) values(?,?,?,?,?,'Delivery')";
  db.query(sqlquery,[id,rem_amount,paid_amount,createddate,createTime],(err,result)=>{
    if(err) 
    res.send({message:"Bill does not pay sucessfully"});
    
    
  })
})

 
 //customer order history
 app.get('/customer/order/get',(req,res)=>{
     const id=req.query.id;
     //console.log(id);
     var sqlquery="Select * from orders where customer_id=?";
     db.query(sqlquery,id,(err,result)=>{
        if(err) 
        res.send({message:"Error getting Orders"});
        else
        res.send(result)
        
      })
 })

app.get('/customer/order/getitems',(req,res)=>{
   const order_id=req.query.order_id;

   var sqlquery="Select * from cart_items,admin_items where order_id=? and admin_items.items_id=cart_items.cust_items_id ";
   db.query(sqlquery,order_id,(err,result)=>{
      if(err) 
      res.send({message:"Error getting Orders"});
      else
      res.send(result)
      
    })

})

 app.put('/orders/update/rating',(req,res)=>{
  const id=req.query.id;
  const rating=req.body.Price;
  

  var sqlquery="Update orders set rating=? where order_id=?";
  db.query(sqlquery,[rating,id],(err,result)=>{
     if(err) 
     res.send({message:"Error Updating Rating"});
     else
     res.send(result.length)
     
   })

 })

 app.post('/orders/complain/post',(req,res)=>{
const id=req.query.id;
const order_id=req.body.order_id;
const complain=req.body.Price;

var sqlquery="INSERT INTO Complains(customer_id,order_ID,Complain_user) values(?,?,?)";
db.query(sqlquery,[id,order_id,complain],(err,result)=>{
  if(err) 
  res.send({message:"Error Adding Complains"});
  else
  res.send(result.length)
  
})


 })



app.get('/user/get/Complains',(req,res)=>{
const id=req.query.id;

var sqlquery="Select * from Complains where customer_id=?";
db.query(sqlquery,id,(err,result)=>{
  if(err) 
  res.send("Error getting Complains");
  else
  res.send(result)
  
})

})



//showing items in cart
app.get('/customer/items/cart/get',(req,res)=>{
  
  const id=req.query.id;
  
  
  var sqlquery="Select count(cust_items_id) as totalItems from customer_items where customer_id=?"
  db.query(sqlquery,id,(err,result)=>{
    if(err) 
    res.send({message:"Please Reload the page"});
 else
 res.send(result);
    
  })

})


//showing tables reserved by customer

app.get('/customer/reservedtables',(req,res)=>{
 
  const id=req.query.id;
  var sqlquery="Select * from reserve_tables  where status='RESERVED' and customer_id=?"
  db.query(sqlquery,id,(err,result)=>{
    if(err) console.log(err);
    if(result.length>0)
    {
      res.send(result);
    }
    else
    {
      res.send({message:"No table is reserved for this user"})
    }
  
    
  })


})


app.put('/user/table/appointment',(req,res)=>{
const id=req.query.id;
const {table_id,startTime,EndTime}=req.body;
 
var sqlquery="Update reserve_tables set START_DATE=?,END_DATE=?,customer_id=?,status='PENDING' where table_id=? "

client.messages
  .create({
     body: "Dear Customer your table is reserved with the Table ID   " +table_id + " From " + startTime  +   "  To  " +EndTime,
     from: '+12344075058',
     to: '+923090710374'
   })

  .then(message => console.log(message.sid)); 
db.query(sqlquery,[startTime,EndTime,id,table_id],(err,result)=>{
  if(err) 
  //console.log(err);
  res.send({message:err.sqlMessage});
  

  
})

})


app.get('/user/PendingTables',(req,res)=>{
  const id=req.query.id;
 
   
  var sqlquery="SELECT * FROM RESERVE_TABLES WHERE CUSTOMER_ID=?";
  
  db.query(sqlquery,id,(err,result)=>{
    if(err) 
    //console.log(err);
    res.send({message:err.sqlMessage});
    else
    res.send(result);
  
    
  })
  
  })

  app.get('/customer/viewTables',(req,res)=>{
    
   
     
    var sqlquery="SELECT * FROM RESERVE_TABLES WHERE STATUS='UNRESERVED'";
    
    db.query(sqlquery,(err,result)=>{
      if(err) 
      //console.log(err);
      res.send({message:err.sqlMessage});
      else
      res.send(result);
    
      
    })
    
    })


    app.get('/customer/checktable',(req,res)=>{
 
      const id=req.query.id;
      const table_id=req.query.table_id;

      var sqlquery="Select END_DATE from reserve_tables  where (status='RESERVED' and customer_id=?) and table_id=?"
      db.query(sqlquery,[id,table_id],(err,result)=>{
        if(err) console.log(err);
        if(result.length>0)
        {
          res.send(result);
        }
        else
        {
          res.send({message:"Kindly refresh the Page"})
        }
      
        
      })
    
    
    })

    app.put('/customer/tableLate',(req,res)=>{
      const id=req.body.id;
      const table_id=req.body.table_id;
      console.log(id,table_id);
       
      var sqlquery="Update reserve_tables set status='UNRESERVED',customer_id=NULL where table_id=? and customer_id=?;"
      
      db.query(sqlquery,[table_id,id],(err,result)=>{
        if(err) 
        //console.log(err);
        res.send({message:err.sqlMessage});
        
      
        
      })
      
      })

      app.get("/user/get/orders/items",(req,res)=>{
         
        const sqlquery = "Select * from orders ";
        db.query(sqlquery,(err,result)=>{
          if(err) 
          //console.log(err);
          res.send({message:err.sqlMessage});
          else
          res.send(result)
        
          
        })

      })
      app.post("/user/post/orders/items",(req,res)=>{
         const id=req.body.id;

        const sqlquery = "Insert into cart_items(cust_items_id) select cust_items_id from customer_items where customer_id=?";
        db.query(sqlquery,id,(err,result)=>{
          if(err) 
          //console.log(err);
          res.send({message:err.sqlMessage});
          else
          res.send(result.length)
        
          
        })

      })

      app.put("/user/update/orders/items",(req,res)=>{
        const order_id=req.body.orderlength;
        console.log(order_id);
       const sqlquery = "Update cart_items set order_id=? where order_id is null";
       db.query(sqlquery,order_id,(err,result)=>{
         if(err) 
         //console.log(err);
         res.send({message:err.sqlMessage});
         else
         res.send(result.length)
       
         
       })

     })


app.listen(3001,()=>{
    console.log("listens on port 3001");
    })