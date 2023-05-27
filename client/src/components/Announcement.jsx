import styled from "styled-components"
const Container=styled.div`
   height: 30px;
   background-color: teal;
   color: white;
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 14px;
   font-weight: 5;
`;

const Announcement = () => {
    return (
        <Container>
            Super Deal! Freee Shipping on Orders Over $30
        </Container>
    );
};

export default Announcement;