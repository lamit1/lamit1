import React, { useState } from 'react'
import styled from 'styled-components'
import {mobile} from "../responsive";
import {useDispatch, useSelector} from "react-redux"
import { login } from '../redux/apiCall';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    background:linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center; ;
    background-size: cover;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 25%;
    background-color: white;
    ${mobile({ width: "75%" })}

`
const Title = styled.h1`
    font-style: 24px;
    font-weight: 300;    
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    flex:1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`
const LinkTo = styled.a`
    margin: 5px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`
const Error = styled.span`
    color: red;
`

const Login = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const {isFetching, error} = useSelector((state)=>state.user)
    
    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch,{username,password})
    }

    return (
    <Container>
        <Wrapper>
            <Title>Sign in</Title>
            <Form>
                <Input placeholder="username"
                 onChange={(e)=> setUsername(e.target.value)}></Input>
                <Input placeholder="password" 
                        type="password"
                 onChange={(e)=> setPassword(e.target.value)}></Input>
                <Button onClick={handleClick} disabled={isFetching}>
                <Link to="/" style={{"text-decoration":"none", "color":"white"}}>
                Login
                </Link>
                </Button>
                {error && <Error>Wrong password</Error>}
                <LinkTo>Do you remember your password?</LinkTo>
                <LinkTo>Create a new account</LinkTo>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login