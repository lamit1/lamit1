import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
`
const Title = styled.h1`
    color: white;
`
const Button = styled.button`
    background-color: white;
    border-radius: 9px;
    border: 10px;
    padding: 10px;
    cursor: pointer;
    color: gray;
    font-weight: 600;
    &:hover{
        transform: scale(1.1);
        background-color: black;
        color: white;
    }
`


const CategoryItem = ({item}) => {
  return (
    <Container>
        <Link to={`/products/${item.cat}`}>
        <Image src={item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
        </Info>
        </Link>
    </Container>
  )
}

export default CategoryItem