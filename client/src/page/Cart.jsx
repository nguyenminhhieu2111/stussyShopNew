
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Header from "../components/Header";
import StripeCheckout from "react-stripe-checkout";
import { useEffect,useState } from "react";
import { userRequest } from "../RequestMethod";
import axios from "axios";
import { addRemove, clearCart, removeProduct } from "../../redux/cartRedux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;

`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`

`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 20px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const ButtonClear=styled.button`
width: 180px;
height: 50px;
background-color: brown;
outline: none;
border: 3px solid gray;
cursor: pointer;
color: white;
margin: 10px 15px;
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const KEY ='pk_test_51KvberEXHCMU0WpMpkYeO0Xs47abyVzvZNcVDcMOrFgmMickXU7y0gwZelGe1l8FTj1O6ErVua6ylWYD7hQqUAiU00shFjPsIe';

const Cart = () => {
  const cart = useSelector((state) => state.cart.initialState);
  const pricer= useSelector((state) => state.cart.initialState.products.price);
  const users=useSelector((state)=>state.user.currentUser)
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
 const dispatch=useDispatch()
  const onToken = (token) => {
    setStripeToken(token);
  };
  
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment",{
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: res.data,
           });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  const result=cart.products.map(item=>{
    return item
  })
console.log(result)

const newPost={
  userEmail:users?.email,
  userFullname:users?.fullname,
  userimg:users?.img,
  userId:users?._id,
  total:cart.total,
  products:result,
  quantum:cart.quantity
}


  const handleOrder= async()=>{
  
    try{
      const res=await axios.post('http://localhost:5000/api/orders',newPost)  
      console.log(res.data)  
      toast.success("post succesfully")
    }catch(error){
      console.error(error)
     toast.error("post error")
    }
  }
  


  const handleClear=()=>{
    dispatch(clearCart())
    toast.success("deleted")
  }

  return (
    <Container>
      <Header />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
        <Link to="/">
          <TopButton>CONTINUE SHOPPING</TopButton>
        </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={handleOrder}>Order NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
          {cart.products.map((product) => (
              <Product key={product._id}>
              {/* <CancelPresentation sx={{position:"absolute",right:"70px",top:"0px",cursor:"pointer",fontSize:"30px"}} onClick={handleRemove}/>  */}
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <span>QUANITY:</span>
                    <ProductAmount>{product.quantity}</ProductAmount>                   
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
            {cart.total > 0 ? <ButtonClear onClick={handleClear}>CLEAR CART</ButtonClear> : ""}
           
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Stussy Shop"
              image="https://www.elleman.vn/wp-content/uploads/2018/09/11/logo-thuong-hieu-stussy-3-elle-man.jpg"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
      <ToastContainer/>
    </Container>
  );
};

export default Cart;