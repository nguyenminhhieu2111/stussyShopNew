import React, { useEffect, useState } from 'react';
import axios from "axios"
import styled from 'styled-components';
import {popularProducts} from './Datas'
import Product from './Product';
const Container=styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`
const Products = ({cat,filter,sort}) => {
    const [products,setProducts]=useState([])
    const [FilterProducts,setFilterProducts]=useState([])
    useEffect(()=>{
        const getProducts=async ()=>{
            try {
                const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}`: "http://localhost:5000/api/products")
                console.log(res)
                setProducts(res.data)
            } catch (err) {
                
            }
        }
        getProducts()
    },[cat])

    useEffect(()=>{
        cat&&
        setFilterProducts(
            products.filter((item) =>
              Object.entries(filter).every(([key, value]) =>
                item[key].includes(value)
            ))
        )
    },[products,cat,filter])

    useEffect(() => {
        if (sort === "newest") {
          setFilterProducts((prev) =>
            [...prev].sort((a, b) => a.createdAt - b.createdAt)
          );
        } else if (sort === "asc") {
          setFilterProducts((prev) =>
            [...prev].sort((a, b) => a.price - b.price)
          );
        } else {
          setFilterProducts((prev) =>
            [...prev].sort((a, b) => b.price - a.price)
          );
        }
      }, [sort]);
    
    return (
        <Container>
         {cat
        ? FilterProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 15)
            .map((item) => <Product item={item} key={item.id} />)}
        </Container>
    );
};

export default Products;