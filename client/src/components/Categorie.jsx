import React from 'react';
import styled from 'styled-components';
import { mobile } from '../Responsive';
import CategorieItem from './CategorieItem';
import {categories} from './Datas'
const Container=styled.div`
display: flex;
padding: 20px;
justify-content: space-between;
${mobile({ padding: "0px", flexDirection:"column" })}
`
const Categorie = () => {
    return (
        <Container>
            {categories.map((item)=>(
             <CategorieItem item={item} key={item.id}/>
            ))}
        </Container>
    );
};

export default Categorie;