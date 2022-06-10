import React, { useState,useEffect } from 'react'
import {Grid,Paper,Typography,TextField,Box,Button} from '@mui/material'
import { useHistory } from 'react-router'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Axios from 'axios'

const LoginPage = () => {
    const[username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [data,setdata]=useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:3001/admin/login/get").then((response)=>

        {
            if(response.data.message)
            alert(response.data.message)
            else
            setdata(response.data)
        });
    },[])
    
    const handlesubmit=(e)=>{
        e.preventDefault();
        if(password===data[0].password && username===data[0].USERNAME )
        {
            history.push('/admin/home')
        }
        else
     {
         alert('Incorrect password')
     }
    }
    const history=useHistory();
    return (
        <Grid container style={{justifyContent:"center"}}>
            <Paper elevation={5} style={{marginTop:"10rem"}}>
                <Box sx={{
                    
                    minHeight:"20rem",
                    width:"25rem"
                }}>
                <Typography variant="h5"  gutterBottom style={{color:"silver",marginTop:"2rem",marginLeft:"2rem"}}>Login</Typography>
                 <form style={{margin:"1rem"}} onSubmit={handlesubmit} >
                    
                     <TextField variant="outlined" label="Enter Username"  margin="normal" onChange={(e)=>setusername(e.target.value)} required ></TextField>
                     <TextField variant="outlined" label="Enter password"  margin="normal" type="password"  onChange={(e)=>setpassword(e.target.value)} required  ></TextField>
                     
                   
                   
                   
         
                   
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

export default LoginPage
