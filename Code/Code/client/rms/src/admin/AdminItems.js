import { Grid, Typography,Box, Card, CardHeader,CardMedia,CardContent, CardActions } from '@mui/material'
import Axios  from 'axios';
import React, { useState,useEffect } from 'react'


import UpdatePrice from './UpdatePrice';

const AdminItems = () => {


const [data,setdata]=useState([]);





useEffect(()=>{
  
 Axios.get("http://localhost:3001/admin/items").then((response)=>{
 if(response.data.message)
 alert(response.data.message)
 else  {
  setdata(response.data);
 }
 });
   },[])
    return (
       
            <Box sx={{marginTop:"6rem",marginLeft:"2rem"}}>
    
        <Typography variant="h5" style={{borderBottom:"1px solid gray",width:"8rem"}} >
            Food Items
        </Typography>
  
        
        <Grid container >
        {data.map(items=>(
          <div item key={items.items_id} >
           
    
    
        <Grid >
            <Card sx={{marginTop:"2rem",marginLeft:"0.5rem",width:"15rem"}}>
                <CardHeader title={items.title}
                  subheader={items.subheader}
                />
        <CardMedia
        component="img"
        height="194"
        image={items.src}
        alt="Paella dish"
      />
      <CardContent>
          <Typography variant="body" color="text.secondary">
              Price :
          </Typography>
          <Typography variant="body" style={{marginLeft:"0.5rem"}}>
              {items.Price}
          </Typography>
          </CardContent>
     <CardActions>
       
     <UpdatePrice items={items} />
        
      </CardActions>
     
         
        
            </Card>
        </Grid>
        
        </div>
        
      ))}   
    
        </Grid>
        </Box>
        
    )
}

export default AdminItems
