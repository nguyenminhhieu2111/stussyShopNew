import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components'
import { Search, ShoppingCartOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import {mobile} from '../Responsive'
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {logoutUser} from '../../redux/UserRedux'
import { clearCart } from '../../redux/cartRedux';
import SearchParams from './SearchParams';

const Container = styled.div`
  height: 60px;
  ${mobile({height:"50px"})}
`;
const Avatar = styled.img`
   border-radius: 999px;
   width: 7.5%;
   margin-left: 5px;
`
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({padding:"10px 0px"})}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({display:"none"})}
`;



const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color:#DC1D51;
  font-size: 30px;
  font-family: 'stussy';
  ${mobile({ fontSize: "22px",marginLeft:"5px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "5px" })}
`;

const Header = () => {
  const quantity = useSelector(state=>state.cart.initialState?.quantity)
  const user=useSelector(state=>state.user.currentUser)
  const dispatch=useDispatch()
  const handleDelete=(e)=>{
    e.preventDefault();
    dispatch(logoutUser())
    dispatch(clearCart())
    
  }
  const handleClear=()=>{
    dispatch(clearCart())
  }
 
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchParams/>
        </Left>
        <Center>
          <Link to="/">
          <Logo>STUSSSY</Logo>
          </Link>
        </Center>
        <Right>
        {user ? <MenuItem style={{color:"red",fontWeight:"600",textTransform: "uppercase",fontFamily:"cursive",letterSpacing:"2px"}}>{user.fullName}</MenuItem> :
         <Link to="/register">
         <MenuItem>REGISTER</MenuItem>      
         </Link>
         }
         {user ? <Avatar src={user.img}/> : "" }
        {user ? <MenuItem onClick={handleDelete}>Log out</MenuItem>:
        <Link to="/Login">
        <MenuItem onClick={handleClear}>Login</MenuItem>
        </Link>}
        
          
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;