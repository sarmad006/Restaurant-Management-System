import React,{useState} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import { Modal,TextField,IconButton,Button } from '@mui/material';
import axios from 'axios';

export const UpdateChairs = ({orders}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #CCCCFF',
        borderRadius:'5px',
        boxShadow: 24,
        p: 4,
      };
   
      const[open,setopen]=useState(false);
      const[chairs,setchairs]=useState('');


      const handleUpdate=(table_id)=>{
        if(chairs<=0 || chairs>8)
        alert("Input invalid")
        else{
        
        axios.put("http://localhost:3001/admin/UpdateChairs",{
            table_id:table_id,
            chairs:chairs
        }).then((response)=>{
          if(response.data.message)
          alert(response.data.message)});
        setopen(false);
        window.location.reload();
    }  
  }
    return (
        <>
        <IconButton color="primary" onClick={()=>setopen(true)}>{<EditIcon/>}</IconButton>
                <Modal
        open={open}
        onClose={()=>setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <TextField label="chairs"  variant="standard" style={{display:"block"}}
          onChange={(e)=>setchairs(e.target.value)}
          ></TextField>
         <Button variant="contained" style={{marginRight:"1rem",float:"right"}}
         onClick={()=>handleUpdate(orders.table_id)}
        >Update</Button>          
          
        </Box>
      </Modal>
      </>
    )
}
