import React,{useState,useEffect} from 'react'
import Axios  from 'axios';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import { makeStyles } from "@mui/styles";
import {Drawer,Typography,List,ListItem,ListItemText,ListItemIcon, Toolbar,AppBar, Avatar} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useHistory,useLocation } from "react-router-dom"; 
import {format} from "date-fns";
import { useParams } from 'react-router';
import TableBarIcon from '@mui/icons-material/TableBar';
import PendingIcon from '@mui/icons-material/Pending';
import LogoutIcon from '@mui/icons-material/Logout';
import MailOutlineIcon from '@mui/icons-material/MailOutline';



 const drawerwidth="18rem";
 const usestyles=makeStyles((theme)=>{
   return{  
    page:{
         
         width:"100%",
         
         
         
     },
     drawer:{
         width:drawerwidth,
         
         
     },
     root:{
         display:"flex"
     },
     active:{ 
         backgroundColor:"#d3d3d3 !important"
        
     },
     title:{
        padding:theme.spacing(3)
        
     },
    appbar:{
        width:`calc(100% - ${drawerwidth})!important`,
       
    },
    toolbar: {
        marginTop:"3rem"
    },
    appbartypo:{
       flexGrow:1
    },
    avatar:{
        marginLeft:theme.spacing(2)
    }
    }
 })

const   CustomerNavbar= ({children}) => {
    const {id} = useParams();
    
     
    const menuitems=[
        
        {text: "Place Order",
        icon:<BorderColorIcon color="primary"/>,
        path: `/customer/addorder/${id}`
    },
    {
        text: "View Orders",
        icon:<ReceiptIcon color="primary"/>,
        path: `/customer/viewOrders/${id}`
    },
    {
        text: "Reserve Table",
        icon:<TableBarIcon color="primary"/>,
        path: `/customer/table/${id}`
    
    },
       
    { 
        text: "Reserved Table",
        icon:<PendingIcon color="primary"/>,
        path: `/customer/Pendingtable/${id}`
    },

    {
        text: "Profile Settings",
        icon:<SettingsIcon color="primary"/>,
        path: `/customer/profile/${id}`
},
{

    text: "Complain Monitoring",
    icon:<MailOutlineIcon color="primary"/>,
    path: `/customer/Complains/${id}`
},
{
    text: "Log Out",
    icon:<LogoutIcon color="primary"/>,
    path: `/`
}

    ]
    const [data,setdata]=useState([]);
    
        useEffect(()=>{
            
            Axios.get('http://localhost:3001/customer/home',{ params: { id: id } }).then((response)=>
            {
            if(response.data.message)
            alert(response.data.message)
            else
            setdata(response.data[0].fname)
            })
           //eslint-disable-next-line react-hooks/exhaustive-deps    
        },[])

    const classes=usestyles();
    
    const history=useHistory();
    const location=useLocation();
    return ( 

    <div className={classes.root}>
        <AppBar color="info" className={classes.appbar} elevation={0}>
          <Toolbar>
              <Typography color="textsecondary" className={classes.appbartypo}>
              Today's date is {format(new Date(),'do MMMM yyy')}
              </Typography>
              <Typography >
                  {data}
              </Typography>
              <Avatar src="/nicolas-horn.jpg" className={classes.avatar}></Avatar>
          </Toolbar>
          </AppBar>
        <Drawer className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{paper:classes.drawer}}>
            <div>
                <Typography variant="h5" style={{fontFamily:"cursive"}} className={classes.title}>
                    The RMS 
                </Typography>
                <List>
                    {menuitems.map(menu=>(
                         <ListItem key={menu.text}
                          button 
                          onClick={()=>history.push(menu.path)}
                          className={location.pathname === menu.path ? classes.active: null}>
                            <ListItemIcon  > {menu.icon} </ListItemIcon>
                            <ListItemText primary={menu.text} />
                         </ListItem>
                    ))}
                   
                </List>
            </div>
            </Drawer>
            <div className={classes.page}>
         <div className={classes.toolbar}>
        {children}
        </div>
    </div>
            
    </div> );
}
 


export default CustomerNavbar
