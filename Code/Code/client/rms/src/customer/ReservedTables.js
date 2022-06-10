import { Typography,Box, Grid,Card,CardActions,CardContent, Button } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'

const ReservedTables = () => {
    
    const {id}=useParams();
    const [message,setmessage]=useState('');
    const[data,setdata]=useState([]);
    const history=useHistory();

    useEffect(()=>{
      axios.get("http://localhost:3001/customer/reservedtables",{
          params:{
              id:id
          }
      }).then((response)=>
      {
      if(response.data.message){
          setmessage(response.data.message);
      }
      else
      setdata(response.data);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const HandleReservedOrder=(table_id)=>{
     axios.get("http://localhost:3001/customer/checktable",{
         params:{
             id:id,
             table_id:table_id
         }}).then((response)=>
         {
         if(response.data.message){
             alert(response.data.message);
         }
         else
         {
            var d = new Date();
            var m = d.getMinutes();
            var h = d.getHours();
            if(h === '0') {h = 24}
            
            var currentTime = h+"."+m;
            console.log(currentTime);
           
            // get input time
            var time = response.data[0].END_DATE.split(":");
            var hour = time[0];
            if(hour === '00') {hour = 24}
            var min = time[1];
            
            var inputTime = hour+"."+min;
            console.log(inputTime);
          
            var totalTime = currentTime - inputTime;
            console.log(totalTime);

         if((totalTime) <= 0)
         {
           history.push(`/customer/bill/${id}`);
         }
         else
         {
             axios.put("http://localhost:3001/customer/tableLate",{
                 id:id,
                 table_id:table_id
             }).then((response)=>
             {
             if(response.data.message){
                 alert(response.data.message)
             }
         });
         
         alert("Your reserved table was deallocated as you're not on time");
         window.location.reload();
         
        }}});
     

    }

    return (
        <Box sx={{marginTop:"8rem"}}>
          <Typography align="center" variant="h4" style={{fontFamily:"cursive"}}>
              Reserved Tables
          </Typography>
          <Typography align="center" color="error" variant="h5" style={{marginTop:"1rem"}}>{message} </Typography>
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
           <Button onClick={()=>HandleReservedOrder(orders.table_id)}>Proceed Order</Button>
                      
            </CardActions>
            </Card>
            </Grid>
       )}
       </Grid>
        </Box>
    )
}

export default ReservedTables
