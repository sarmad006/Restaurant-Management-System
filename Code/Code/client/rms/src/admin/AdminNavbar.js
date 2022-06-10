import React from 'react'
import PreviewIcon from '@mui/icons-material/Preview';

import { makeStyles } from "@mui/styles";
import {Drawer,Typography,List,ListItem,ListItemText,ListItemIcon, Toolbar,AppBar, Avatar} from "@mui/material";

import { useHistory,useLocation } from "react-router-dom"; 
import {format} from "date-fns";

import PendingActions from '@mui/icons-material/PendingActions';
import PendingIcon from '@mui/icons-material/Pending';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import BookIcon from '@mui/icons-material/Book';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
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

const  AdminNavbar= ({children}) => {
 
    const menuitems=[
        
        {text: "View Items",
        icon:<PreviewIcon color="primary"/>,
        path: "/admin/items"
    },
    {
        text: "View Orders",
        icon:<PendingIcon color="primary"/>,
        path: "/admin/ViewOrders"
    },
    {
        text:"View Tables",
        icon:<TableRestaurantIcon color="primary"/>,
        path:"/admin/viewTables"
    },
    {
        text:"Requested Tables",
        icon:<PendingActions color="primary"/>,
        path:"/admin/RequestedTables"
    },
    {
        text:"Registered Customers",
        icon:<AppRegistrationIcon color="primary"/>,
        path:"/admin/RegisteredCustomers"
    },
    {
        text:"Booked Tables",
        icon:<BookIcon color="primary"/>,
        path:"/admin/BookedTables"
    },
    {

        text: "Complain Monitoring",
        icon:<MailOutlineIcon color="primary"/>,
        path: `/admin/Complains`
    },
    {
        text: "Log Out",
        icon:<LogoutIcon color="primary"/>,
        path: `/`
    }
    

    ]
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
                  Admin
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
 


export default AdminNavbar
