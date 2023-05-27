import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter, YouTube } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';
import payment from '../image/52-528387_paypal-png.png'
const Container=styled.div`
display: flex;
`
const Left=styled.div`
flex:1;
display: flex;
flex-direction: column;
padding: 20px;
`
const Center=styled.div`
flex:1;
padding: 20px;
`
const Title=styled.h3`
margin-bottom: 30px;
`
const List=styled.ul`
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-wrap: wrap;
`

const ListItem=styled.li`
width: 50%;
margin-bottom: 10px;
`
const Right=styled.div`
flex:1;
padding: 30px;
`;
const Logo=styled.h1``;
const Desc=styled.p`
margin: 20px 0px;
`;
const SocialContainer=styled.div`
display: flex;
`;
const SocialIcon=styled.div`
 width: 40px;
 height: 40px;
 border-radius: 50%;
 color: white;
 cursor: pointer;
 background-color: #${props => props.color};
 display: flex;
 align-items: center;
 justify-content: center;
 margin-right: 20px;
`;

const ContactItem=styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;
`
const Payment=styled.img`
width: 40%;
`
function Footer() {
    return (
        <Container>
          <Left>
             <Logo>STUSSY</Logo>
              <Desc>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis debitis similique aliquid corporis consectetur repellat blanditiis in autem ullam, accusamus natus magni, harum amet ipsa voluptatibus cum hic reprehenderit atque.
              </Desc>
              <SocialContainer>
                  <SocialIcon color="1854FA">
                      <Facebook/>
                  </SocialIcon>

                  <SocialIcon color='F72DB9'>
                      <Instagram/>
                  </SocialIcon>

                  <SocialIcon color='2DBBF7'>
                      <Twitter/>
                  </SocialIcon>

                  <SocialIcon color='AB0C24'>
                      <Pinterest/>
                  </SocialIcon>

                  <SocialIcon color='FF0000'>
                      <YouTube/>
                  </SocialIcon>
              </SocialContainer>
          </Left>
          <Center>
                <Title>Useful Link</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Terms</ListItem>
                </List>

          </Center>
          <Right>
              <Title>Contact</Title>
              <ContactItem>
                <Room style={{marginRight:"10px"}} />
                  495 Nguyen Trai, Thanh Xuan , Ha Noi
              </ContactItem>

              <ContactItem>
                <Phone style={{marginRight:"10px"}}/>
                  +98 927619858
              </ContactItem>

              <ContactItem>
                <MailOutline style={{marginRight:"10px"}}/>
                  Contact@Stussy.com
              </ContactItem>

              <Payment src={payment}/>
          </Right>
        </Container>
    );
}

export default Footer;