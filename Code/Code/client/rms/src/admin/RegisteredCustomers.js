import React, { useEffect, useState } from 'react'
import {Box,Typography,Card} from '@mui/material'
import Axios from 'axios'
import {  useParams } from 'react-router'

const RegisteredCustomers = () => {

    const {id}=useParams();
    const [data,setdata]=useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:3001/admin/registeredCustomer",{params :{id:id}}).then((response)=>{
        if(response.data.message)
        alert(response.data.message)
        else    
        setdata(response.data)
        })
            //eslint-disable-next-line react-hooks/exhaustive-deps  
    },[])


    return (
        <Box sx={{marginTop:"10rem"}}>
        <Typography variant="h5" textAlign="center" gutterBottom style={{fontFamily:"cursive"}}>
           Registered Customers
        </Typography>
        <div style={{marginTop:"3rem"}}>
        <Typography variant="body" style={{marginLeft:"12rem"}}>
            Customer ID
        </Typography>
        <Typography variant="body" style={{marginLeft:"3rem"}}>
            Username
        </Typography>
        <Typography variant="body" style={{marginLeft:"8rem"}}>
            First Name
        </Typography>
        <Typography variant="body" style={{marginLeft:"3rem"}}>
          Last Name
        </Typography>
        <Typography variant="body" style={{marginLeft:"3rem"}}>
            Phone Number
        </Typography>
       
       </div>
     <Card style={{marginLeft:"10rem",marginTop:"1rem",width:"50rem"}}>
     {data.map(orders=>(
         <div>
       <Typography variant="body" style={{marginLeft:"2rem"}}>
       {orders.Customer_id}
   </Typography>
   <Typography variant="body" style={{marginLeft:"8rem"}}>
       {orders.USERNAME}
   </Typography>
   <Typography variant="body" style={{marginLeft:"8rem"}}>
       {orders.fname}
   </Typography>
   <Typography variant="body" style={{marginLeft:"5rem"}}>
       {orders.lname}
   </Typography>
   <Typography variant="body" style={{marginLeft:"4rem"}}>
       {orders.phoneNumber}
   </Typography>
   
     </div>
     ))}
     </Card>
        </Box>
    )
    
}

export default RegisteredCustomers
