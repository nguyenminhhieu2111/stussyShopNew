import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../Responsive';
const Container=styled.div`
 flex: 1;
 margin: 5px;
 height: 70vh;
 position: relative;
`
const Image=styled.img`
 width: 100%;
 height: 100%;
 object-fit: cover;
 ${mobile({ height: "30vh"})}
`
const Info=styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: rgba(0,0,0,0.4);
text-align: center;

`
const Title=styled.h1`
color: white;
margin-bottom: 20px;
font-size: 50px;
${mobile({ fontSize: "30px",color:"#EF1FE5"})}
`
const Button=styled.button`
 border: none;
 padding: 10px;
 background-color: white;
 color: gray;
 cursor: pointer;
 font-weight: 600;
 border-radius: 5px;
`
const CategorieItem = ({item}) => {
    return (
        <Container>
        <Link to={`/products/${item.cat}`}>
            <Image loading='lazy' src={item.img}/>
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
        </Link>
        </Container>
    );
};

export default CategorieItem;