import { Typography,Card,CardContent,CardActions,Grid,Button} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Bookedtables = () => {

    const [data,setdata]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3001/admin/BookedTables").then((response)=>
        {
        if(response.data.message)
        alert(response.data.message);
        else
        setdata(response.data)
        });
    },[])

    const HandleDeallocate=(table_id)=>{
        axios.put("http://localhost:3001/admin/tableUnbooked",{
            table_id:table_id
        }).then((response)=>{
            if(response.data.message)
            alert(response.data.message);
           
            });
            
            window.location.reload();
    }

    return (
        <Box sx={{marginTop:"8rem"}}>
            <Typography textAlign="center" variant="h6" gutterBottom style={{fontFamily:"cursive"}}>
              Booked Tables
            </Typography>
         
            <Grid container>
       {data.map(orders=>
       <Grid>
        <Card style={{marginLeft:"2rem",width:"15rem",marginTop:"1rem"}}>
            <CardContent>
                <Typography variant="body">
                    Table ID :
                </Typography>
                <Typography variant="body" style={{marginLeft:"1rem"}}>
                    {orders.table_id}
                </Typography>
                <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Chairs :
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem"}}>
                    {orders.chairs}
                </Typography>

              </div>
              <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Status :
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem",color:"gray"}}>
                    {orders.STATUS}
                </Typography>
              </div>

              <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Customer ID :
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem",color:"gray"}}>
                    {orders.customer_id}
                </Typography>
              </div>

              <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Arriving Time :
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem",color:"gray"}}>
                    {orders.START_DATE}
                </Typography>
              </div>

              <div style={{marginTop:"1rem"}}>
                <Typography variant="body" >
                    Leaving Time :
                </Typography>
                <Typography variant="body" style={{marginLeft:"0.2rem",color:"gray"}}>
                    {orders.END_DATE}
                </Typography>
              </div>
                
            </CardContent>
            <CardActions>
           <Button onClick={()=>HandleDeallocate(orders.table_id)} >De allocate</Button>           
           

            </CardActions>
            </Card>
            </Grid>
       )}

       
       </Grid>
        </Box>
    )
}

export default Bookedtables
