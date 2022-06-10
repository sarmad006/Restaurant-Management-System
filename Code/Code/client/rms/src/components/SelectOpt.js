import React from 'react'
import {Box,Grid,Typography,Button} from '@mui/material'
import { useHistory } from 'react-router'
const SelectOpt = () => {
    const history=useHistory();
    return (
        <Grid container style={{justifyContent:"center",backgroundImage:"url(/Food.png)",height: "100%",width:"100%",backgroundPosition:"top",backgroundRepeat: "no-repeat"}}>
                
                <Box style={{marginTop:"18rem"}}>
                <Typography variant="h3" textAlign="center" gutterBottom style={{fontFamily:"cursive",color:"cornflowerblue",marginTop:"2rem"}}>RMS</Typography>
                 <Typography variant="h5" textAlign="center" gutterBottom color="text.secondary">Restaurant Management System</Typography>
                 <Button style={{marginTop:"3rem"}}  variant="contained" onClick={()=>history.push('/admin/login')}>Login As Administrator</Button>
                 <Button style={{marginTop:"3rem",marginLeft:"3rem"}} color="error"  variant="contained"
                 onClick={()=>history.push('/customer/signup')}>
                 Login As User</Button>
                 </Box>
                    
                     
                     </Grid>
    )
}

export default SelectOpt
