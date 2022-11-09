import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    background:linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center; ;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding: 20px;
    width: 40%;
    background-color: white;
    ${mobile({ width: "75%" })}

`
const Title = styled.h1`
    font-style: 24px;
    font-weight: 300;    
`
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const Input = styled.input`
    flex:1;
    min-width: 40%;
    margin: 20px 10px 0 0;
    padding: 10px;
`
const Agreement = styled.p`
    font-style: 12px;
    margin: 20px 0 ;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    align-items: center;
    cursor: pointer;
`


const Register = () => {
  return (
    <Container>
        <Wrapper>
            <Title>Create an account</Title>
            <Form>
                <Input placeholder="name"></Input>
                <Input placeholder="last name"></Input>
                <Input placeholder="username"></Input>
                <Input placeholder="email"></Input>
                <Input placeholder="password"></Input>
                <Input placeholder="confirm password"></Input>
                <Agreement>
                By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button>Register</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register