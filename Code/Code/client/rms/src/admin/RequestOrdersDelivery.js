import { CardContent, Typography,Card,Grid, CardActions ,Button,Modal} from '@mui/material'
import { Box } from '@mui/system'
import Axios  from 'axios';
import React, { useEffect, useState } from 'react'

const RequestOrdersDelivery = () => {
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
     Axios.get("http://localhost:3001/admin/order/get/delivery").then((response)=>{
        if(response.data.message)
        alert(response.data.message)
        else 
        setdata(response.data)});
 })


const handleApprove=(order_id,bill,fname)=>{
//console.log(order_id)
console.log(order_id,bill,fname)
 Axios.put("http://localhost:3001/admin/order/post",{
   order_id:order_id  ,
   bill:bill,
   fname:fname
 }).then((response)=>{
    if(response.data.message)
    alert(response.data.message)
    
 });

 
    //window.location.reload();

}


const handleCancel=(order_id)=>{
    console.log(order_id);
    
     Axios.put("http://localhost:3001/admin/orders/cancel/post",{
       order_id:order_id  
     }).then((response)=>{
        if(response.data.message)
        alert(response.data.message)
        
 });
    window.location.reload();
    
    }
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
        <Box sx={{marginTop:"5rem"}}>
        <Typography variant="h5" textAlign="center" style={{fontFamily:"cursive"}}>
            Pending Orders
        </Typography>
        <Grid container>
       {data.map(orders=>
       <Grid>
        <Card style={{marginLeft:"2rem",width:"15rem",marginTop:"3rem"}}>
            <CardContent>
                <Typography variant="body">
                    Order ID :
                </Typography>
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
                <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Order Amount :
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem"}}>
                    {orders.PAID_AMOUNT}
                </Typography>
              </div>
              <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Customer ID :
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem"}}>
                    {orders.customer_id}
                </Typography>
              </div>
              <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Customer Name:
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem"}}>
                    {orders.fname}
                </Typography>
              </div>
              <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Customer Phone Number :
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem"}}>
                    {orders.phoneNumber}
                </Typography>
              </div>
              
            </CardContent>
            <CardActions>
                <Button onClick={()=>handleApprove(orders.order_id,orders.PAID_AMOUNT,orders.fname)}>Approve</Button>
                <Button onClick={()=>handleCancel(orders.order_id)}>Cancel</Button>
            </CardActions>
        </Card>
        
        </Grid>
        
        )}
        </Grid>
        </Box>
            
        
    )
}

export default RequestOrdersDelivery
