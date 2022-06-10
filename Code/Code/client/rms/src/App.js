  import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import AdminNavbar from './admin/AdminNavbar';
import HOME from './admin/HOME';
import './App.css';
import LoginPage from './components/AdminLoginPage';

import SelectOpt from './components/SelectOpt';
import SignUp from './components/SignUp';
import CustomerHome from './customer/CustomerHome';
import CustomerLogin from './customer/CustomerLogin';
import CustomerNavbar from './customer/CustomerNavbar';

import {ThemeProvider,createTheme} from '@mui/material/styles';
import Profile from './customer/Profile';
import AdminItems from './admin/AdminItems';

import OrderView from './customer/OrderView';
import Bill from './customer/Bill';
import FinalOrders from './customer/FinalOrders';
import RequestOrders from './admin/RequestOrders';

import ViewTables from './admin/ViewTables';
import CreateTable from './admin/CreateTable';
import CustomerItems from './customer/CustomerItems';
import OrderMethod from './customer/OrderMethod'
import ReservedTables from './customer/ReservedTables';
import CustomerTable from './customer/Table';
import GoodBye from './customer/GoodBye';

import PendingTable from './customer/PendingTable';
import RequestedTables from './admin/RequestedTables';
import DeliveryBill from './customer/DeliveryBill';
import RegisteredCustomers from './admin/RegisteredCustomers';
import Bookedtables from './admin/Bookedtables';
import AdminViewOrders from './admin/AdminViewOrders';
import RequestOrdersDelivery from './admin/RequestOrdersDelivery';
import AdminOrdersHistory from './admin/AdminOrdersHistory';
import ComplainMonitoring from './customer/ComplainMonitoring';
import ComplainOption from './admin/ComplainOption';
import NewComplains from './admin/NewComplains';
import AdminComplainHistory from './admin/AdminComplainHistory';
import CreateItems from './admin/CreateItems';




const theme=createTheme({
  
  typography:{
    fontFamily: "Quicksand"
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path='/'>
         <SelectOpt/>
        </Route>
        <Route path='/admin/login'>
          <LoginPage/>
        </Route>
        <Route path='/customer/signup'>
          <SignUp/>
        </Route>
        <Route path='/customer/login'>
        <CustomerLogin/>
        </Route>
      
        <Route path='/admin/home'>
        <AdminNavbar>
          <HOME/>
          </AdminNavbar>
          </Route>
          <Route path='/admin/items'>
        <AdminNavbar>
          <AdminItems/>
          </AdminNavbar>
        </Route> 
        <Route path='/admin/createItems'>
        <AdminNavbar>
          <CreateItems/>
          </AdminNavbar>
        </Route> 

       

        <Route path='/admin/viewTables'>
        <AdminNavbar>
          <ViewTables/>
          </AdminNavbar>
        </Route>  


        <Route path='/admin/createTable'>
        <AdminNavbar>
          <CreateTable/>
          </AdminNavbar>
        </Route>  


        <Route path='/admin/RequestedTables'>
        <AdminNavbar>
          <RequestedTables/>
          </AdminNavbar>
        </Route>  

        <Route path='/admin/RegisteredCustomers'>
        <AdminNavbar>
       <RegisteredCustomers/>
          </AdminNavbar>
        </Route> 
  
        <Route path='/admin/BookedTables'>
        <AdminNavbar>
            <Bookedtables/>
          </AdminNavbar>
        </Route> 

        <Route path='/admin/ViewOrders'>
        <AdminNavbar>
            <AdminViewOrders/>
          </AdminNavbar>
        </Route> 

        <Route path='/admin/DINEIN/Orders'>
        <AdminNavbar>
            <RequestOrders/>
          </AdminNavbar>
        </Route> 
 
        <Route path='/admin/Delivery/Orders'>
        <AdminNavbar>
            <RequestOrdersDelivery/>
          </AdminNavbar>
        </Route> 
  
        <Route path='/admin/History/Orders'>
        <AdminNavbar>
            <AdminOrdersHistory/>
          </AdminNavbar>
        </Route>

        <Route path='/admin/Complains'>
        <AdminNavbar>
            <ComplainOption/>
          </AdminNavbar>
        </Route>

        <Route path='/admin/NewComplains'>
        <AdminNavbar>
            <NewComplains/>
          </AdminNavbar>
        </Route>

        <Route path='/admin/PreviousComplains'>
        <AdminNavbar>
            <AdminComplainHistory/>
          </AdminNavbar>
        </Route>
        
        <Route  path='/customer/home/:id'>
        <CustomerNavbar>
          <CustomerHome/>
          </CustomerNavbar>
        </Route>
        <Route  path='/customer/profile/:id'>
        <CustomerNavbar>
          <Profile/>
          </CustomerNavbar>


        </Route>

        <Route path='/customer/Complains/:id'>
        <CustomerNavbar>
          <ComplainMonitoring/>
          </CustomerNavbar>
      </Route>
       

        <Route  path='/customer/addorder/:id'>
        <CustomerNavbar>
          <CustomerItems/>
          </CustomerNavbar>
        </Route>
        
        <Route path='/customer/proceedOrder/:id'>
        <CustomerNavbar>
          <OrderView/>
          </CustomerNavbar>
        </Route>
  
        <Route path='/customer/method/:id'>
        <CustomerNavbar>
          <OrderMethod/>
          </CustomerNavbar>
        </Route>
  
        <Route path='/customer/dine/:id'>
        <CustomerNavbar>
          <ReservedTables/>
          </CustomerNavbar>
        </Route>


        <Route path='/customer/bill/:id'>
        <CustomerNavbar>
          <Bill/>
          </CustomerNavbar>
        </Route>

        <Route path='/customer/viewOrders/:id'>
        <CustomerNavbar>
          <FinalOrders/>
          </CustomerNavbar>
        </Route>


        <Route path='/customer/table/:id'>
        <CustomerNavbar>
          <CustomerTable/>
          </CustomerNavbar>
        </Route>

        <Route path='/customer/Pendingtable/:id'>
        <CustomerNavbar>
          <PendingTable/>
          </CustomerNavbar>
        </Route>

        <Route path='/customer/Delivery/:id'>
        <CustomerNavbar>
          <DeliveryBill/>
          </CustomerNavbar>
        </Route>


        <Route path='/customer/Bye'>
        
          <GoodBye/>
          
        </Route>
        
        
      </Switch>
    </Router>
    </ThemeProvider>
  );
}

export default App;
