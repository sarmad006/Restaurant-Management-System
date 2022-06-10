import React, { useEffect, useState } from 'react'
import {Box,Typography,Card,Button,Modal} from '@mui/material'
import Axios from 'axios'
import {  useParams } from 'react-router'
import Moment from 'moment';
import CustomerRating from './CustomerRating';
import CustomerComplain from './CustomerComplain';

const FinalOrders = () => {
   
    const {id}=useParams();
    const [data,setdata]=useState([]);
    const [items,setitems]=useState([]);
    const[open,setopen]=useState(false);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #EAEDED',
        borderRadius:'15px',
        boxShadow: 24,
        p: 4,
      };

    useEffect(()=>{
        Axios.get("http://localhost:3001/customer/order/get",{params :{id:id}}).then((response)=>{
        if(response.data.message)
        alert(response.data.message)
        else
        {    
        setdata(response.data)
        console.log(data);
        }
        })
            //eslint-disable-next-line react-hooks/exhaustive-deps  
    },[])
 
    const handleClick=(order_id)=>{
        Axios.get("http://localhost:3001/customer/order/getitems",{params:
        {order_id:order_id}}).then((response)=>{
            if(response.data.message)
            alert(response.data.message)
            else
            {    
            setitems(response.data)
            setopen(true);
            }
            })
    }

    return (
        <Box sx={{marginTop:"10rem"}}>
        <Typography variant="h5" textAlign="center" gutterBottom style={{fontFamily:"cursive"}}>
           View Orders
        </Typography>
        <div style={{marginTop:"3rem"}}>
        <Typography variant="body" style={{marginLeft:"2rem"}}>
            Order ID
        </Typography>
        <Typography variant="body" style={{marginLeft:"2rem"}}>
            Order Date
        </Typography>
        <Typography variant="body" style={{marginLeft:"5rem"}}>
            Bill
        </Typography>
        <Typography variant="body" style={{marginLeft:"3rem"}}>
            Amount Paid
        </Typography>
        <Typography variant="body" style={{marginLeft:"2rem"}}>
            Order Status
        </Typography>
        <Typography variant="body" style={{marginLeft:"2rem"}}>
            Order Method
        </Typography>
        <Typography variant="body" style={{marginLeft:"2rem"}}>
            Order Rating
        </Typography>
        <Typography variant="body" style={{marginLeft:"2rem"}}>
            Order Complain
        </Typography>
       </div>
     <Card style={{marginLeft:"1.5rem",marginTop:"1rem",width:"60rem"}}>
     {data.map(orders=>(
         <div>
      <Button variant="none" style={{display:"inline"}} onClick={()=>handleClick(orders.order_id)}>
            {orders.order_id}
        </Button>
        <Modal
        open={open}
        onClose={()=>setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
        {items.map(cart=>
         <div style={{marginTop:"0.2rem"}}>
          <Typography variant="body">
            {cart.title}
          </Typography>
          
          </div>
          )}
           </Box>
          </Modal>



   <Typography variant="body" style={{marginLeft:"1rem"}}>
       {Moment(orders.order_date).format('MM-DD-YYYY')}
       T
   </Typography>
   <Typography variant="body" style={{marginLeft:"0.1rem"}}>
       
       {orders.order_time}
   </Typography>
   <Typography variant="body" style={{marginLeft:"2rem"}}>
       {orders.PAID_AMOUNT}
   </Typography>
   <Typography variant="body" style={{marginLeft:"4rem"}}>
       {orders.REM_AMOUNT}
   </Typography>
   <Typography variant="body" style={{marginLeft:"5rem"}}>
       {orders.STATUS}
   </Typography>
   <Typography variant="body" style={{marginLeft:"3rem"}}>
       {orders.order_method}
   </Typography>
  <CustomerRating orders={orders}/>
  <CustomerComplain orders={orders}/>
     </div>
     ))}
     </Card>
        </Box>
    )
}

export default FinalOrders