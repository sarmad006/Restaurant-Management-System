import { Typography,Card,CardContent,CardActions,Grid} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'


const PendingTable = () => {
    const [data,setdata]=useState([]);
    const {id}=useParams();

    useEffect(()=>{
        axios.get("http://localhost:3001/user/PendingTables",{
           params:{
               id:id
           }
        
        }).then((response)=>
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
              Reserved Tables 
            </Typography>
            <Grid container>
       {data.map(orders=>
       <Grid>
        <Card style={{marginLeft:"2rem",width:"15rem",marginTop:"3rem"}}>
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
           
                      
            </CardActions>
            </Card>
            </Grid>
       )}
       </Grid>
        </Box>
    )
}

export default PendingTable

