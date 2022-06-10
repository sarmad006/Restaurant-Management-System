import { Grid, Typography,Box, Card,Modal, CardHeader,CardMedia,CardContent, CardActions, Button, Badge } from '@mui/material'
import Axios  from 'axios';
import React, { useState,useEffect } from 'react'
import { useHistory, useParams } from 'react-router';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';


const CustomerItems = () => {

const {id}=useParams();    
const [newdata,setdata]=useState([]);
const history=useHistory();
const [cartitems,setcartitems]=useState([]);
const[open,setopen]=useState(false);
const [itemslength,setitemslength]=useState(0);


useEffect(()=>{
 Axios.get("http://localhost:3001/admin/items").then((response)=>
 {
  if(response.data.message)
  alert(response.data.message)
  else
   setdata(response.data)
 });
 
 Axios.get('http://localhost:3001/customer/items/cart/get',{params:{id:id}}).then((response)=>{
  if(response.data.message)
  alert(response.data.message)
  else
 setitemslength(response.data[0].totalItems)}
   );
//eslint-disable-next-line react-hooks/exhaustive-deps  
   },[])


    const handleCartDelete=(cart_id)=>{
      
     Axios.delete("http://localhost:3001/customer/items/delete",
        {
          params:{
            id:id
          }
        }
      ).then((response)=>{
        if(response.data.message)
        alert(response.data.message)
        else
        setopen(false)
        window.location.reload()
      });
     
    }

   const handleCart=()=>{
     Axios.get("http://localhost:3001/customer/items/get",{
        
         params:{
           id:id
         }
       }
     ).then((response)=>{
      if(response.data.message)
      alert(response.data.message)
      else
      {
       setcartitems(response.data)
       setopen(true);
      }
     });
   
   }

   const handleadd=(cust_id)=>{
     
   Axios.post(`http://localhost:3001/customer/items`,
   
   {
    cust_id:cust_id

    },
    {
      params:{
        id:id
      }
    }
   
   ).then((response)=>{
     if(response.data.message)
     alert(response.data.message)
     
    
   }
   

   );
   window.location.reload();
  }



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
  
    return (
        <Box sx={{marginTop:"6rem",marginLeft:"2rem"}}>
    
        <Typography variant="h5" style={{borderBottom:"1px solid gray",width:"11rem",fontFamily:"cursive"}} >
            FOOD ITEMS
        </Typography>
       
       <div style={{float:"right",marginRight:"2rem"}} >
         <Badge style={{color:"cornflowerblue"}} badgeContent={itemslength} onClick={()=>handleCart()}><AddShoppingCartIcon/></Badge>
         
        <Modal
        open={open}
        onClose={()=>setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
      
         {cartitems.map(cart=>
         <div style={{marginTop:"0.2rem"}}>
          <Typography variant="body">
            {cart.title}
          </Typography>
          
          </div>
          )}
            <Button content color="primary" style={{float:"right",marginRight:"1rem"}} onClick={()=>handleCartDelete()} 
               startIcon={<DeleteIcon/>} > Delete Items </Button>
          
          </Box>
          </Modal>
         </div>


        
        <Grid container >
        {newdata.map(items=>(
          <div item key={items.items_id} >
           
    
    
        <Grid >
            <Card sx={{marginTop:"2rem",marginLeft:"0.5rem",width:"15rem"}}>
                <CardHeader title={items.title}
                  subheader={items.subheader}
                />
        <CardMedia
        component="img"
        height="194"
        image={items.src}
        alt="Paella dish"
      />
      <CardContent>
          <Typography variant="body" color="text.secondary">
              Price :
          </Typography>
          <Typography variant="body" style={{marginLeft:"0.5rem"}}>
              {items.Price}
          </Typography>
          </CardContent>
     <CardActions>
      <Button style={{flexGrow:"1"}} onClick={()=>handleadd(items.items_id)}>ADD</Button>
      </CardActions>
     
     
      </Card>
        </Grid>
        
        </div>
        
      ))}   
        </Grid>
      
        <Button variant="contained" style={{float:"right",marginRight:"2rem"}} onClick={()=>history.push(`/customer/proceedOrder/${id}`)}>PROCEED</Button>
        </Box>
    )
}

export default CustomerItems
