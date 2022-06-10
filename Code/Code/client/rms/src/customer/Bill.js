import { Typography,Box,Card, CardContent, TextField,Button } from '@mui/material'
import Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useHistory } from 'react-router';

const Bill = () => {

    const[data,setdata]=useState([]);
 
    const {id}=useParams();
    const [amount,setamount]=useState('');
    const [renderdata,setrenderdata]=useState([]);
   var orderlength=0;
    let bill=0;
    const history=useHistory();
    

    useEffect(()=>{
       
        Axios.get("http://localhost:3001/customer/bill/get" , {params : {id:id}}).then((response)=>{
        if(response.data.message)
        alert(response.data.message)
        else
        setdata(response.data)
    });

    Axios.get("http://localhost:3001/customer/bill/get" , {params : {id:id}}).then((response)=>{
        if(response.data.message)
        alert(response.data.message)
        else
        setrenderdata(response.data[0])
    });
          
      
           
        //eslint-disable-next-line react-hooks/exhaustive-deps       
    },[])


    bill = data.reduce((totalItems, order) => totalItems + parseInt(order.price, 10), 0);
    
    const handlePay=()=>{
        
        if(amount<bill)
        alert("Insufficient Amount")
        else
        {
        Axios.post("http://localhost:3001/customer/orders/post",{
            amount:amount,
            bill:bill
        },
        {
            params:{
                id:id
            }
        }).then((response)=>{
            if(response.data.message)
        alert(response.data.message)
        
        });
        Axios.get("http://localhost:3001/user/get/orders/items").then((response)=>{
            if(response.data.message)
            alert(response.data.message)
            else
            {    
          orderlength=response.data.length;
          Axios.put("http://localhost:3001/user/update/orders/items",{
            orderlength:orderlength
         

        }).then((response)=>{
           if(response.data.message)
           alert(response.data.message) });
          
            }
            });
        Axios.delete("http://localhost:3001/customer/items/delete",{params:{id:id}}).then((response)=>{
            if(response.data.message)
        alert(response.data.message)
        else
        history.push(`/customer/viewOrders/${id}`)
        });

       
    }
    }
    return (
       <Box sx={{marginTop:"10rem",textAlign:"center"}} >
           <Typography variant="h4" style={{fontFamily:"cursive"}} color="GrayText">
               Bill Receipt
           </Typography>
           {renderdata ?
          (  
              <>
               <Card style={{marginTop:"2rem",marginLeft:"20rem",width:"25rem"}}>
            <CardContent>
            
            
                <div style={{marginTop:"1rem"}}>
            <Typography variant="body" style={{marginRight:"2rem"}}>Customer first Name </Typography>
             <Typography variant="body" color="GrayText">{renderdata.fname}</Typography>
             </div>
             <div style={{marginTop:"1rem"}}>
             <Typography variant="body" style={{marginRight:"2rem"}}>Customer last Name </Typography>
             <Typography variant="body" color="GrayText">{renderdata.lname}</Typography>
            </div>
            <div style={{marginTop:"1rem"}}>
             <Typography variant="body" style={{marginRight:"2rem"}}>Customer Phone Number </Typography>
             <Typography variant="body" color="GrayText">{renderdata.phoneNumber}</Typography>
            </div>
            
            <div style={{marginTop:"1rem"}}>
             <Typography variant="body" style={{marginRight:"2rem"}}>Total Amount </Typography>
             <Typography variant="body" color="GrayText">{bill}</Typography>
            </div>
                
            </CardContent>
           </Card>
          <div style={{marginTop:"2rem"}}>
           <TextField label="enter Amount" type="number" onChange={(e)=>setamount(e.target.value)}></TextField>
           <Button style={{marginTop:"1rem",marginLeft:"1rem"}} onClick={()=>handlePay()}>Pay</Button>     
       </div> 
       </>)
 :  <Typography color="error">You didn't selected any item</Typography>}
       </Box>
    )
}

export default Bill
