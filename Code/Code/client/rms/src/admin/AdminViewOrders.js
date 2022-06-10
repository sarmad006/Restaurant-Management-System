import React from 'react'
import {Box,Grid,Typography,Button} from '@mui/material'
import { useHistory } from 'react-router'

const AdminViewOrders = () => {
    const history=useHistory();
    return (
        <Grid container style={{justifyContent:"center"}}>
           
                <Box style={{marginTop:"8rem"}}>
                <Typography variant="h5" textAlign="center" gutterBottom style={{fontFamily:"cursive",color:"cornflowerblue",marginTop:"2rem"}}>ORDERS</Typography>
               
                 <Button style={{marginTop:"3rem"}}  variant="contained" onClick={()=>history.push('/admin/DINEIN/Orders')} >DINE-IN ORDERS</Button>
                 <Button style={{marginTop:"3rem",marginLeft:"3rem"}} color="error"  variant="contained" onClick={()=>history.push('/admin/Delivery/Orders')}>
                 DELIVERY ORDERS </Button>
                 <Button style={{marginTop:"3rem",marginLeft:"3rem"}} color="secondary"  variant="contained" onClick={()=>history.push('/admin/History/Orders')}>
                  ORDERS history </Button>
                 </Box>
                    
                     
                     </Grid>
    )
}

export default AdminViewOrders
