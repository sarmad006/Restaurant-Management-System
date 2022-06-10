import React, { useEffect, useState } from 'react'
import {Box,Typography,IconButton,Grid,Card,CardContent, CardActions} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

import { UpdateChairs } from './UpdateChairs';


const ViewTables = () => {


    
    
    const [newdata,setdata]=useState([]);

    const history=useHistory();
    
    useEffect(()=>{
  
        axios.get("http://localhost:3001/admin/viewTables").then((response)=>{
            if(response.data.message)
            alert(response.data.message)
            else 
            setdata(response.data);
     });


    },[])

    const HandleDelete=(table_id)=>{
    
        axios.delete("http://localhost:3001/admin/deleteTables",{
            data:{
                table_id:table_id
            }
        }).then((response)=>{
            if(response.data.message)
            alert(response.data.message)
            
          
     });
     window.location.reload();
    
    }



   
    return (
        <Box sx={{marginTop:"5rem"}}>
        <Typography variant="h5" textAlign="center" style={{fontFamily:"cursive"}}>
            View Tables
        </Typography>
        <Grid container>
       {newdata.map(orders=>
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
                <IconButton color="primary" onClick={()=>HandleDelete(orders.table_id)}>{<DeleteIcon/>}</IconButton>
                <UpdateChairs orders={orders} />              
            </CardActions>
            </Card>
            </Grid>
       )}
      
        <Box component="span" sx={{p:2.6, border: '1px dashed grey',marginLeft:"2rem",height:"2.5rem" ,width:"3rem",marginTop:"4rem"}}>
      <IconButton color="primary" onClick={()=>history.push("/admin/createTable")}>{<AddIcon/>}</IconButton>
    </Box>
    </Grid>
        </Box>
    )
}

export default ViewTables
