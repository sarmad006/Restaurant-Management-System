import { Typography,Card,CardContent,CardActions,Grid} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import AdminComplainResponse from './AdminComplainResponse'


const NewComplains = () => {
    const [data,setdata]=useState([]);
    

    useEffect(()=>{
        axios.get("http://localhost:3001/admin/get/newComplains").then((response)=>
        {
        if(response.data.message)
        alert(response.data.message);
        else
        setdata(response.data)
        });
    // eslint-disable-next-line    
    },[])

    return (
        <Box sx={{marginTop:"8rem"}}>
            <Typography textAlign="center" variant="h6" style={{fontFamily:"cursive"}}>
              Recent Complains
            </Typography>
            <Grid container>
       {data.map(orders=>
       <Grid>
        <Card style={{marginLeft:"2rem",width:"15rem",marginTop:"3rem"}}>
            <CardContent>
                <Typography variant="body">
                    Complain ID :
                </Typography>
                <Typography variant="body" style={{marginLeft:"1rem"}}>
                    {orders.Complain_ID}
                </Typography>
                <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Customer ID :
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem"}}>
                    {orders.customer_id}
                </Typography>

              </div>
              <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Order ID :
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem",color:"gray"}}>
                    {orders.order_ID}
                </Typography>
              </div>

              <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Your Message :
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem",color:"gray"}}>
                    {orders.Complain_user}
                </Typography>
              </div>
           <AdminComplainResponse orders={orders} />
              
              
            </CardContent>
            <CardActions>
           
                      
            </CardActions>
            </Card>
            </Grid>
       )}
       </Grid>
        </Box>
    )
}

export default NewComplains
