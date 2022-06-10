import { Typography,Modal,Box,TextField, Card, IconButton,Button} from '@mui/material'
import React, { useState,useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import Axios from 'axios'
import EditIcon from '@mui/icons-material/Edit';



const Profile = () => {
    const {id}=useParams();
    const [data,setdata]=useState([]);
    const[open,setopen]=useState(false);
    const[open1,setopen1]=useState(false);
    const[open2,setopen2]=useState(false);
    const[updatefName,setUpdatefName]=useState('');
      const[updateLname,setUpdateLname]=useState('');
      const[updatephoneNo,setUpdatephoneNo]=useState('');
      const history=useHistory();



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
      

    useEffect(()=>{
        
        Axios.get('http://localhost:3001/customer/home',{ params: { id: id } }).then((response)=>
        {
        if(response.data.message)
        
        alert(response.data.message)
        
        else
          setdata(response.data[0])
        })
       
      //eslint-disable-next-line react-hooks/exhaustive-deps 
      },[])

       function capitalizeFirstLetter(string) {
        return String(string).charAt(0).toUpperCase() + String(string).slice(1);
      }

      const handleCloseFname=()=>{
        Axios.put("http://localhost:3001/profile/update/fname" ,{
          fname:updatefName,
          
      },
      { params: { id: id } }
      ).then((response)=>{
          if(response.data.message)
          alert(response.data.message)
          
        });
            setopen(false);
            window.location.reload();
          }


      const handleCloseLname=()=>{
        Axios.put("http://localhost:3001/profile/update/lname" ,{
          lname:updateLname,
          
      },
      { params: { id: id } }
      ).then((response)=>{
        if(response.data.message)
        alert(response.data.message)
      });
      setopen1(false);
      window.location.reload();
        
       
      }

      const handleClosePhoneNo=()=>{
        Axios.put("http://localhost:3001/profile/update/phoneNo" ,{
          phone:updatephoneNo,
          
      },
      { params: { id: id } }
      ).then((response)=>{
        if(response.data.message)
        alert(response.data.message);
      });
          setopen2(false);
          window.location.reload();
         
        }


const Handledeleteuser=()=>{
  console.log(id);
  Axios.delete("http://localhost:3001/user/delete",{
    params:{
      id:id
    }
  }).then((response)=>{
  if(response.data.message)
  alert(response.data.message)
   else
   history.push('/customer/Bye')
  });
}     
        
       
      

    return (
        <div style={{marginTop:"8rem",textAlign:"center"}}>
            <Typography variant="h4"  style={{color:"cornflowerblue",fontFamily:"cursive"}}>
                User Profile
            </Typography>



          <Card sx={{marginLeft:"22rem",width:"20rem",marginTop:"2rem",paddingTop:"2rem"}}>
              
            <div>
            <Typography variant="body"  style={{marginLeft:"0.5rem"}}>
                User Name 
            </Typography>
            <Typography variant="body"  style={{marginLeft:"1rem",color:"gray"}}>
                {data.USERNAME}
            </Typography>
           
            </div>
            
            
            <div style={{marginTop:"1rem"}}>
            <Typography variant="body"  style={{marginLeft:"2rem"}}>
                First Name 
            </Typography>
            <Typography variant="body"  style={{marginLeft:"1rem",color:"gray"}}>
                {capitalizeFirstLetter(data.fname)}
            </Typography>
        
        <IconButton color="primary" style={{marginLeft:"1rem"}} 
        onClick={()=>setopen(true)}><EditIcon/></IconButton>
        
        <Modal
        open={open}
        onClose={handleCloseFname}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <TextField label="First Name"  variant="standard"  style={{display:"block"}}
          onChange={(e)=>setUpdatefName(e.target.value)} 
          ></TextField>
         
          
        </Box>
      </Modal>  
            
            </div>
           
            
            <div style={{marginTop:"1rem"}}>
            <Typography variant="body"  style={{marginLeft:"2rem"}}>
                Last Name 
            </Typography>
            <Typography variant="body"  style={{marginLeft:"1rem",color:"gray"}}>
                {capitalizeFirstLetter(data.lname)}
            </Typography>
            
            <IconButton color="primary" style={{marginLeft:"1rem"}} 
            onClick={()=>setopen1(true)}><EditIcon/></IconButton>

            <Modal
        open={open1}
        onClose={handleCloseLname}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>

          <TextField label="Last Name"  variant="standard"  style={{display:"block"}}
          onChange={(e)=>setUpdateLname(e.target.value)} 
          ></TextField>
         
          
        </Box>
      </Modal>  
            
            </div>
            
            {
            <div style={{marginTop:"1rem"}}>
            <Typography variant="body"  style={{marginLeft:"2rem"}}>
                Phone Number
            </Typography>
            <Typography variant="body"  style={{marginLeft:"1rem",color:"gray"}}>
                {data.phoneNumber}
            </Typography>
            
            <IconButton color="primary" style={{marginLeft:"1rem"}} 
            onClick={()=>setopen2(true)}><EditIcon/></IconButton>
            
       <Modal
        open={open2}
        onClose={handleClosePhoneNo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <Box sx={style}>

          <TextField label="Phone Number"  variant="standard" type="number"  style={{display:"block"}}
          onChange={(e)=>setUpdatephoneNo(e.target.value)} ></TextField>
         
          
        </Box>
        </Modal>  
            
            
            </div> }
           
           
          
            
      </Card>
      <Button variant="outlined" style={{marginTop:"3rem"}} onClick={Handledeleteuser}>Delete this User</Button>   
        </div>
    )
}

export default Profile
