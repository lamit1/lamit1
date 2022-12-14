import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import axios from "axios"
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
    

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const based_url=cat
        ? `http://localhost:5000/api/product?category=${cat}`
        : "http://localhost:5000/api/product/"
        const res = await axios.get(
          based_url,
          {headers: {
            'token':"Lam eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmE4OGM5MWNmODk1MGI4Y2IwNjE0NyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Njc5MjYyMjYsImV4cCI6MTY3MDUxODIyNn0.osMu2i7XIIE2w6Q-OgefM_ogZlvLnLDG-_iQCOFeOE8",
            'Access-Control-Allow-Origin':'http://localhost:5000'
        }}
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    getProducts();
  }, [cat]);

  useEffect(()=>{
    cat && setFilteredProducts(
      products.filter((item) =>
      Object.entries(filters).every(([key, value]) =>
        item[key].includes(value)))
    )
  }, [products, cat, filters])

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};


export default Products