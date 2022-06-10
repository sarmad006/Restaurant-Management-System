import React, { useState } from 'react'
import { Box } from '@mui/system'
import { Button, Card,CardContent, TextField, Typography } from '@mui/material'
import Axios  from 'axios'
import { useHistory } from 'react-router'

const CreateTable = () => {

   const [chairs,setchairs]=useState('');
   const history=useHistory();

   const handleAddTable=(e)=>{
     e.preventDefault();
     if(chairs<=0 || chairs > 8)
      alert("Input invalid")
      else{

     Axios.post("http://localhost:3001/admin/createtable",{
       chairs:chairs
     }).then((response)=>{
      if(response.data.message)
      alert(response.data.message)
     
});
     history.push('/admin/viewTables')
   }
  }
    return (
        <Box sx={{marginTop:"8rem"}}>
            <Typography variant="h5" textAlign="center" style={{fontFamily:"cursive"}}>
                Add Table
            </Typography>
            <Card sx={{marginLeft:"20rem",width:"25rem",marginTop:"3rem"}}>
                <CardContent>
                  <TextField label="Enter Chairs" onChange={(e)=>setchairs(e.target.value)}  InputProps={{ inputProps : { min:1,max:8}}} type="number"></TextField>
                  <Button sx={{marginTop:"1rem",marginLeft:"2rem"}} onClick={(e)=>handleAddTable(e)}>Add</Button>
                </CardContent>
            </Card>
            
        </Box>
    )
}

export default CreateTable
