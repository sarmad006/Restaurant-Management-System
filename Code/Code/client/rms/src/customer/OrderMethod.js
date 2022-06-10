import React from 'react'
import { Box,Button,Typography } from '@mui/material'
import { useHistory, useParams } from 'react-router'


const OrderMethod = () => {
    const {id}=useParams();
    const history=useHistory();
    return (
        <Box sx={{marginTop:"15rem",textAlign:"center"}}>
         <Typography variant="body" color="text.secondary" style={{display:"block",marginBottom:"2rem"}}>
             How you Want us to take your order ?
         </Typography>
         <Button  variant="contained" style={{marginRight:"2rem"}} onClick={()=>history.push(`/customer/dine/${id}`)}>
             DINE-IN
         </Button>
         <Button color="error" onClick={()=>history.push(`/customer/Delivery/${id}`)}>
             Deliver Food Online
         </Button>
        </Box>
    )
}

export default OrderMethod
