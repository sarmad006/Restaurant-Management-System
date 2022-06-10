import React,{useState} from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {Modal,TextField,Box,Button, Typography} from '@mui/material'
import axios from 'axios';
import { useParams } from 'react-router';


const TableTimings = ({orders}) => {
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
     
      const {id}=useParams();
      const[open,setopen]=useState(false);
      const[startTime,setstartTime]=useState('');
      const[EndTime,setEndTime]=useState('');
      


      const handleSubmit=(e,table_id)=>{
      
       e.preventDefault();
       if(startTime>24)
       {
         alert("Invalid Time")
       }
      else if(EndTime>24)
       {
        alert("Invalid Time")
      }
      else if(startTime>EndTime)
      {
        alert("Invalid Time")
      }
       else
       {
      axios.put("http://localhost:3001/user/table/appointment",{
         
      table_id:table_id,
      startTime:startTime,
      EndTime:EndTime
      },
      {
        params:{
            id:id
           
        }
      }).then((response)=>{
         if(response.data.message)
         alert(response.data.message);
        
      });

      setopen(false);
      window.location.reload();

    

       
     
      
    }
    }  
    
    return (
        <>
        <Button color="primary" onClick={()=>setopen(true)} endIcon={<AccessTimeIcon/>}>Add your timings</Button>
                <Modal
        open={open}
        onClose={()=>setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
           
        <form onSubmit={(e)=>handleSubmit(e,orders.table_id)} >
          <Typography variant="body1" gutterBottom color="GrayText">Reserve According to the 24h clock</Typography>
          <TextField label="Your Expected Arriving Time" placeholder="hh:mm"  variant="standard" required style={{display:"block"}}
          onChange={(e)=>setstartTime(e.target.value)}
          ></TextField>
           <TextField label="Your Expected Leaving Time"  variant="standard" placeholder="hh:mm" required style={{display:"block",marginTop:"1rem"}}
          onChange={(e)=>setEndTime(e.target.value)}
          ></TextField>
          <Button variant="contained" style={{marginTop:"2rem"}} type="submit">Set Appointment</Button>
          </form>
        </Box>
      </Modal>
      </>
    )
}

export default TableTimings
