const sql=require('mysql')

const db=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"abc123",
    database:"rms"
})
db.connect(function(err) {
    if (err) {
      console.error('error connecting: ');
      return;
    }
   
    console.log('connected as id ');
  });
  

  module.exports=db;