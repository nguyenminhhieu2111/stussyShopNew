import {useSelector} from 'react-redux'
import { useLocation } from 'react-router-dom';
import './Order.css'
export default function OrderProducts(){
    const location = useLocation();
    const orderId = location.pathname.split("/")[2];
    const cart = useSelector((state) =>
    state.order.orders.find((orders) => orders._id===orderId),
    );
   
    console.log(cart)
    return(
       <>
           <div className='container'>
             <div className="containers">

              <div className="userBox">
                  <p>Customer Order</p>
                  <h5>{cart.fullName}</h5>
                  <span>{cart.userEmail}</span>
                  <img src={cart.userimg} alt="" />
              </div>
              <div className="boxBuy">
              {cart.products.map((item)=>
              <div className="productBuy" key={item._id}>
                  <div className="boxImg" >
                  <img src={item.img} alt="" />
                  </div>
                  <div className="boxTitle">
                      <h4>ProductID :{item._id}</h4>
                      <h4>Size:{item.size}</h4>
                      <h4>Price:{item.price}</h4>
                      <h4>Quantum:{item.quantity}</h4>
                  </div>
              </div>
              )}             
              <div className="total">
                  <h3>Quanity:{cart.quantum}</h3>
                  <h3>Total:{cart.total} $</h3>
              </div>
              </div>
             </div>
           </div>
       </>
    )
}