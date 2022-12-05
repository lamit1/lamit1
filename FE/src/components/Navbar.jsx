import { Badge } from '@material-ui/core'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom';
import { logout } from '../redux/userRedux'

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
    *:focus {
    outline: none;
    }
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display:flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
`

const Logo = styled.h1`
    font-weight: bold;
    text-align: center;
    ${mobile({ fontSize: "24px" })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}

`

const MenuItem = styled.div`
    display: flex;
    text-align: center;
    text-decoration: none;
    font-size: 24px;
    cursor: pointer;
    margin-left: 25px;
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`


const Navbar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
    const quantity = useSelector(state => state.cart.quantity)
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>LAM.</Logo>
                </Center>
                <Right >
                    {user ?
                        (<>
                            <MenuItem>
                                <div style={{"padding":"3px 0 0 0"}}>
                                <AccountCircleIcon style={{ "color": "teal", "margin":"0"}}
                                />
                                </div>
                                <div style={{ "text-transform": "uppercase", "margin": "0 0 0 5px"}}>
                                    {user.username}
                                </div>
                            </MenuItem> 
                            <MenuItem>
                                <Link to="/" style={{ "text-decoration": "none", "color": "black", "text-align": "center" }}
                                    onClick={() => { dispatch(logout()) }}>
                                    LOGOUT
                                </Link>
                            </MenuItem>
                        </>) : (<>
                            <Link to="/register" style={{ "text-decoration": "none", "color": "black" }}>
                                <MenuItem>Register</MenuItem>
                            </Link>
                            <Link to="/login" style={{ "text-decoration": "none", "color": "black" }}>
                                <MenuItem>Sign in</MenuItem>
                            </Link>
                        </>)}
                    <Link to="/cart" >
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined htmlColor='black' />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar