import React from 'react'
import {Box,Grid,Typography,Button} from '@mui/material'
import { useHistory } from 'react-router'


const ComplainOption = () => {
    const history=useHistory();
    return (
        <Grid container style={{justifyContent:"center"}}>
           
        <Box style={{marginTop:"8rem"}}>
        <Typography variant="h4" textAlign="center" gutterBottom style={{fontFamily:"cursive",color:"cornflowerblue",marginTop:"2rem"}}>Complains</Typography>
       
         <Button style={{marginTop:"3rem"}}  variant="contained" onClick={()=>history.push('/admin/NewComplains')}>New Complains</Button>
         <Button style={{marginTop:"3rem",marginLeft:"3rem"}} color="error"  variant="contained" onClick={()=>history.push('/admin/PreviousComplains')}>
         Complains History </Button>

         </Box>
            
             
             </Grid>
    )
}

export default ComplainOption
