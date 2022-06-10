import { Button,Modal,Box, TextField} from '@mui/material';
import React, { useState } from 'react'
import axios  from 'axios';

const UpdatePrice = ({items}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
   
      const[open,setopen]=useState(false);
      const[updatePrice,setPrice]=useState('');
       
    
    const handleClose=(id)=>{
      if(updatePrice<=0)
      alert("Input invalid")
      else{
      axios.put(`http://localhost:3001/items/update` ,{
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
    

     
    
      const handleClick=()=>{
       
        setopen(true);
        }


    return (
        <div>
          <Button onClick={()=>handleClick()}>Modify</Button>
         
          <Modal
        open={open}
        onClose={()=>setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <TextField label="Price"  variant="standard" style={{display:"block"}}
          onChange={(e)=>setPrice(e.target.value)}
          ></TextField>
          <Button style={{marginRight:"1rem",float:"right"}} onClick={()=>handleClose(items.items_id)}> UPDATE</Button>
          
        </Box>
      </Modal>
       
        </div>
            
        
    )
}

export default UpdatePrice
