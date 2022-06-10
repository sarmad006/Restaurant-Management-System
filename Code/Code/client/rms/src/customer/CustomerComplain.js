import { Button,Modal,Box, TextField} from '@mui/material';
import React, { useState } from 'react'
import axios  from 'axios';
import { useParams } from 'react-router';

const CustomerComplain = ({orders}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #CCCCFF',
        boxShadow: 24,
        p: 4,
      };
      const[open,setopen]=useState(false);
      const[updatePrice,setPrice]=useState('');
      const {id}=useParams();

      const handleClick=()=>{
       
        setopen(true);
        }

        const handleClose=(order_id)=>{
           
            axios.post(`http://localhost:3001/orders/complain/post` ,{
              Price:updatePrice,
             order_id:order_id
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
           
          
          


    return (
        <div style={{display:"inline",marginLeft:"1rem"}}>
          <Button color='error' onClick={()=>handleClick()}>Report a Problem</Button>
         
          <Modal
        open={open}
        onClose={()=>setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <TextField label="Add Your Complain"  variant="standard" style={{display:"block"}}
          onChange={(e)=>setPrice(e.target.value)}
          ></TextField>
          <Button style={{marginRight:"1rem",float:"right"}} onClick={()=>handleClose(orders.order_id)}> UPDATE</Button>
          
        </Box>
      </Modal>
       
        </div>
            
    )
}

export default CustomerComplain

