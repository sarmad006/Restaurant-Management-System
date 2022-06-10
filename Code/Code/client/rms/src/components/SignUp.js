import React, { useState } from 'react'
import {Grid,Box,Typography,TextField,Paper,Button} from '@mui/material'
import { useHistory } from 'react-router'
import Axios from 'axios'


const SignUp = () => {
    const history=useHistory()
    const [fname,setfname]=useState('');
    const [lname,setlname]=useState('');
    const [phone,setphone]=useState('');
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [message,setmessage]=useState('');


    const handlesubmit=(e)=>{
     e.preventDefault();
     Axios.post("http://localhost:3001/user/signup/post",{
         username:username,
         password:password,
         fname:fname,
         lname:lname,
         phone:phone
     }).then((response)=>{
         if(response.data.message)
         {
             setmessage(response.data.message)
         }
     
     else
     {
         
        history.push('/customer/login')
     }
    })
   
    }
    return (
        
        <Grid container style={{justifyContent:"center"}}>
        <Paper elevation={5} style={{marginTop:"10rem"}}>
            <Box sx={{
                
                minHeight:"20rem",
                width:"50rem"
            }}>
                         <Typography variant="body2" style={{marginTop:"1rem"}} textAlign="center" color="error">{message}</Typography>
            <Typography variant="h5"  gutterBottom style={{fontFamily:"cursive",marginTop:"2rem",marginLeft:"2rem"}}>SIGN-UP</Typography>
             <form style={{margin:"1rem"}} onSubmit={handlesubmit}>
                
                 <TextField variant="outlined" label="Enter First Name"  margin="normal" type="text" style={{marginRight:"2rem"}} onChange={(e)=>setfname(e.target.value)} ></TextField>
                 <TextField variant="outlined" label="Enter Last Name"  margin="normal" type="text" style={{marginRight:"1rem"}} onChange={(e)=>setlname(e.target.value)} ></TextField>
                
                 <TextField variant="outlined" label="Enter Phone number" margin="normal" type="number" inputProps={{maxLength:11}} onChange={(e)=>setphone(e.target.value)} ></TextField>
                 <TextField variant="outlined" label="Enter Username"  margin="normal" required style={{marginRight:"2rem"}} onChange={(e)=>setusername(e.target.value)}  ></TextField>
        
                 
                 <TextField variant="outlined" label="Enter password"  type="password" margin="normal" required onChange={(e)=>setpassword(e.target.value)}  ></TextField>
                <Button type="submit" variant="contained" style={{display:"block",marginTop:"2rem"}}>SIGN-UP</Button>
                
               
               
     
               
        
            </form>
            <Button style={{margin:"0.5rem"}} onClick={()=>history.push('/customer/login')}>Already have an Account ?</Button>                
            </Box>

        </Paper>

        
    </Grid>
              
    )
}

export default SignUp
