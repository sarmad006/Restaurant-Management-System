import React, { useState} from 'react'
import {Grid,Paper,Typography,TextField,Box,Button,Card, CardMedia} from '@mui/material'
import { useHistory } from 'react-router'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from 'axios'

const CustomerLogin = () => {
    
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
   

   
    
   const handlesubmit=(e)=>{
        e.preventDefault();
       Axios.post('http://localhost:3001/user/login/post',{
           username:username,
           password:password
       }).then((response)=>{
           if(response.data.message){
               alert(response.data.message)
           }
           else
           {
               history.push(`/customer/home/${response.data[0].CUSTOMER_ID}`)
           }
       })
    } 
    const history=useHistory();
    return (
       
        <Grid container style={{justifyContent:"center"}}>
            <Paper elevation={2} style={{marginTop:"5rem",display:"flex"}}>
            <Card sx={{display:'flex',flexDirection:"column"}} elevation={0}>
            <CardMedia
                component="img"
                src="/humans.png"
                />   
                </Card>
                <Box sx={{
                    minHeight:"20rem",
                    width:"15rem"
                }}>
                    
                <Typography variant="h5"  gutterBottom style={{color:"silver",marginTop:"2rem",marginLeft:"2rem"}}>Login</Typography>
                
                 <form style={{margin:"1rem"}} onSubmit={handlesubmit} >
                    
                     <TextField variant="outlined" label="Enter Username"  margin="normal"  onChange={(e)=>setusername(e.target.value)} required ></TextField>
                     <TextField variant="outlined" label="Enter password"  margin="normal" type="password" onChange={(e)=>setpassword(e.target.value)} required  ></TextField>
                     
                   
                   
                   
         
                   
             <Button variant="contained" type="submit"  style={{display:"block",marginTop:"1rem"}}>
             Login
             </Button>
            
                </form> 
                <Button style={{marginTop:"1rem"}} startIcon={<ArrowBackIosIcon/>} onClick={()=>history.goBack()}>
             Back
             </Button> 
                           
                </Box>
                
             
            </Paper>

            
        </Grid>
        
    )
}

export default CustomerLogin
