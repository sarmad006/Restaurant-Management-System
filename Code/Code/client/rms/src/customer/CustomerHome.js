import { Typography } from '@mui/material'
import React from 'react'



const CustomerHome = () => {
 
 
    
    return (
        <div style={{marginTop:"10rem",display:"flex"}}>
             <div style={{background:"url(/Wine.png)",marginLeft:"1rem",height: "25rem",width:"30%",backgroundPosition:"center",backgroundRepeat: "no-repeat"}}>
            </div>
            <div style={{marginLeft:"6rem",marginTop:"4rem"}}>
         <Typography variant="h4" style={{fontFamily:"cursive"}} gutterBottom color="palevioletred" >
                Welcome To RMS
            </Typography>
            <Typography variant="body" color="GrayText">
                Restaurant Management System
            </Typography>
            </div>
        </div>
    )
}

export default CustomerHome
