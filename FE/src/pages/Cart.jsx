import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Announcement from '../components/Announcement'
import { Add, Remove } from '@material-ui/icons'
import { mobile } from "../responsive";
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from "react-stripe-checkout"
import { userRequest } from '../requestMethods'
import { useNavigate } from 'react-router-dom'
import { increase, decrease, remove } from '../redux/cartRedux'

const KEY = process.env.REACT_APP_STRIPE

const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.div`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type !== "filled" ? "1px solid" : "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`
const TopTexts = styled.div`
${mobile({ display: "none" })}
`

const TopText = styled.div`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`

const Info = styled.div`
    flex:3
`

const Product = styled.div`
    ${mobile({ flexDirection: "column" })}
    display: flex;
    justify-content: space-between;
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`

`
const ProductId = styled.span`

`
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
const ProductSize = styled.span`

`
const PriceDetail = styled.span`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`
const ProductAmount = styled.div`
    ${mobile({ margin: "5px 15px" })}
    font-size: 24px;
    margin: 5px;
`
const ProductPrice = styled.div`
    ${mobile({ marginBottom: "20px" })}
    font-size: 30px;
    font-weight: 200;
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24"};
`


const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItemText = styled.span`

`
const SummaryItemPrice = styled.span`

`
const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`
const ToggleButton = styled.button`
    margin: 0 10px;
    padding: 3px;
    border-radius: 100%;
    background-color: transparent;
    &:hover{
      background-color: black;
      cursor: pointer;
      color: antiquewhite;
      transform: scale(1.2);
    }
`
const RemoveButton = styled.button`
    margin: 10px 0 0 0 ;
    font-weight: 600;
    border-radius: 5px;
    background-color: transparent;
    &:hover{
      background-color: black;
      cursor: pointer;
      color: antiquewhite;
      transform: scale(1.2);
    }
`

const Cart = () => {
  const [stripeToken, setStripeToken] = useState(null)
  const cart = useSelector(state => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onToken = (token) => {
    setStripeToken(token)
  }

  useEffect(() => {
    const makeReq = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        })
        navigate.push("/success", { data: res.data })
      } catch {

      }
    }
    stripeToken && cart.total >= 1 && makeReq()
  }, [stripeToken, cart.total, navigate])



  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title></Title>
        <Top>
          <a href='/' style={{ "text-decoration": "none", "color": "black" }}>
            <TopButton >CONTINUE SHOPPING</TopButton>
          </a>
          <TopTexts>
            <TopText>Shopping Bag (2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product =>(
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName><b>Product:</b> {product.title} </ProductName>
                    <ProductId> {product._id} </ProductId>
                    <ProductColor color={product.color} ><b>Color:</b>{product.color}</ProductColor>
                    <ProductSize> <b>Size:</b> {product.size} </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ToggleButton onClick={() => dispatch(decrease(product._id))}>
                      <Remove />
                    </ToggleButton>
                    <ProductAmount> {product.quantity} </ProductAmount>
                    <ToggleButton onClick={() => dispatch(increase(product._id))}>
                      <Add />
                    </ToggleButton>
                  </ProductAmountContainer>
                  <ProductPrice>$ {product.price * product.quantity} </ProductPrice>
                  <RemoveButton onClick={() => { dispatch(remove(product._id)) }}>REMOVE</RemoveButton>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total} </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <SummaryButton>CHECKOUT NOW</SummaryButton>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart