import { Typography,Card,CardContent,CardActions,Grid} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import TableTimings from './TableTimings'

const CustomerTable = () => {
    const [data,setdata]=useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3001/customer/viewTables").then((response)=>
        {
        if(response.data.message)
        alert(response.data.message)
        else
        setdata(response.data)
    
    })
})
    return (
        <Box sx={{marginTop:"8rem"}}>
            <Typography textAlign="center" variant="h6" style={{fontFamily:"cursive"}}>
              Reserve a table
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
              
            </CardContent>
            <CardActions>
            <TableTimings orders={orders}/>
                      
            </CardActions>
            </Card>
            </Grid>
       )}
       </Grid>
        </Box>
    )
}

export default CustomerTable
