import React, { useState } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const Header = () => {
    const token = localStorage.getItem("accessToken")
    const navigate = useNavigate()
    const logoutHandler = async () => {
        localStorage.removeItem("accessToken")
        navigate('/')

    }



    const decode = jwt_decode(token)
    console.log(decode.username)
    // setUser(decode.username)




    return (
        <Container >
            {token ? (<Navbar className='' bg="light" expand="lg">
                <div className='' style={{ display: 'flex', justifyContent: 'right' }}>
                    <Navbar.Brand >Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">

                            <Nav.Link >{decode.username}</Nav.Link>
                        </Nav>
                        <Nav className="me-auto">

                            <Nav.Link onClick={() => {
                                logoutHandler()
                            }}>Logout</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </div>

            </Navbar>) : ("")}
        </Container>
    )
}

export default Header
