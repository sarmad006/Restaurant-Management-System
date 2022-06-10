import { Button,Modal,Box, TextField} from '@mui/material';
import React, { useState } from 'react'
import axios  from 'axios';

const CustomerRating = ({orders}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #CCCCFF ',
        boxShadow: 24,
        p: 4,
      };
      const[open,setopen]=useState(false);
      const[updatePrice,setPrice]=useState('');


      const handleClick=()=>{
       
        setopen(true);
        }

        const handleClose=(id)=>{
            if(updatePrice<=0 || updatePrice>5)
            alert("Input invalid")
            else{
            axios.put(`http://localhost:3001/orders/update/rating` ,{
              Price:updatePrice,
             
          },
          { params: { id: id } }
          ).then((response)=>{
            if(response.data.message)
            alert(response.data.message)
            else
            {
            setopen(false);
            window.location.reload();    
            }
          
          });
      
          
        
        }  
           
          }
          


    return (
        <div style={{display:"inline",marginLeft:"5rem"}}>
          <Button onClick={()=>handleClick()}>Rate It</Button>
         
          <Modal
        open={open} 
        onClose={()=>setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <TextField label="Rate Your Order 1-5"  variant="standard" style={{display:"block"}}
          onChange={(e)=>setPrice(e.target.value)}
          ></TextField>
          <Button style={{marginRight:"1rem",float:"right"}} onClick={()=>handleClose(orders.order_id)}>GO WITH IT</Button>
          
        </Box>
      </Modal>
       
        </div>
            
    )
}

export default CustomerRating
