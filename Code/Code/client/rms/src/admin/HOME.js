import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material' 
import axios from 'axios';


 
const HOME = () => {
    const [data,setdata]=useState('');
    const [table,settable]=useState('');
    
    useEffect(()=>{
    axios.get("http://localhost:3001/admin/home").then((response)=>{
    if(response.data.message)
    alert(response.data.message)
    else    
    setdata(response.data[0].totalCustomer)});

    axios.get("http://localhost:3001/admin/home/table").then((response)=>{
        if(response.data.message)
        alert(response.data.message)
        else    
        settable(response.data[0].totalTable)});



    })
    return (
        <div style={{marginTop:"15rem",textAlign:"center"}}>
            <Typography variant="h4" style={{fontFamily:"cursive"}} gutterBottom color="palevioletred" >
                Welcome To RMS
            </Typography>
            <Typography variant="body" color="GrayText">
                Restaurant Management System
            </Typography>
            <Typography variant="h5" style={{marginTop:"4rem"}}>
                TOTAL MEMBERS REGISTERED : {data}
            </Typography>
            <Typography variant="h5" style={{marginTop:"4rem"}}>
                TOTAL TABLES  : {table}
            </Typography>
        </div>
    )
}

export default HOME
