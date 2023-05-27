import Sidebar from "./components/sidebar/Sidebar.jsx";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./components/login/Login.jsx";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";
import { useSelector } from "react-redux";
import MailSend from "./pages/Mail/MailSend.jsx";
import OrderProduct from "./pages/Order/Order.jsx";
import OrderProducts from "./pages/Order/OrderProduct.jsx";


function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <Router>
        <Switch>
        <Route path="/login">
         <Login/>
       </Route>
       
       {admin ? (
         <>
           
      <Topbar />
      <div className="container">
        <Sidebar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/mail">
            <MailSend/>
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          <Route path="/order/:orderId">
            <OrderProducts/>
          </Route>
          <Route path="/orders">
            <OrderProduct/>
          </Route>
          
        
      </div>
         </>
       ): <ErrorPage/>}
      
        </Switch>
    </Router>
  );
}

export default App;
