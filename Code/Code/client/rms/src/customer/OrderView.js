import React,{useEffect,useState} from 'react'
import {Box,Typography,Button,Card} from '@mui/material'
import { useHistory, useParams } from 'react-router'
import Axios  from 'axios';



const OrderView = () => {
 
    const {id} =useParams();
    const [data,setdata]=useState([]);
    const history=useHistory();

    useEffect(()=>{
        Axios.get("http://localhost:3001/customer/items/get",{ params: { id: id } }).then((response)=>{
          if(response.data.message)
          alert(response.data.message)
          else   
        setdata(response.data)
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps    
     },[])
    
     const HandleProceed=()=>{
      Axios.post(`http://localhost:3001/user/post/orders/items`,
      {
         id:id
    
      }
      ).then((response)=>{
        if(response.data.message)
        alert(response.data.message)
        else
        history.push(`/customer/method/${id}`)
      })
    
    } 


const handleCancel=()=>{
  Axios.delete("http://localhost:3001/customer/items/delete",{params:{id:id}}).then((response)=>{
    if(response.data.message)
    alert(response.data.message)
    else   
    history.push(`/customer/home/${id}`);  
  });

}


    return (
      <Box sx={{marginTop:"8rem"}}>
      <Typography variant="h4" textAlign="center">
        Your Order
      </Typography>
      <Card style={{marginLeft:"20rem",width:"20rem",marginTop:"2rem",marginBottom:"8rem"}}>
      {data.map(items=>(
       <div style={{marginTop:"1rem",marginBottom:"1rem"}}>
        <Typography variant="body" style={{marginLeft:"1rem"}} >{items.title}</Typography>
        <Typography variant="body" color="GrayText" style={{float:"right",marginRight:"1rem"}}>{items.price}</Typography>   
</div>
      ))}
      </Card>
      <Box style={{float:"right",marginRight:"2rem",marginBottom:"0.5rem"}}>
     
      <Button style={{marginRight:"1rem",backgroundColor:"whitesmoke",color:"black"}} 
      variant="contained" onClick={()=>handleCancel()}>
            Cancel
      </Button>
      <Button variant="contained" onClick={()=>HandleProceed()}>
          Proceed
      </Button>
      </Box>
      </Box>
    )
}

export default OrderView
