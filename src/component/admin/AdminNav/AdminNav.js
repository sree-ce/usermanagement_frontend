import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

export const AdminNav = () => {
    return (

        <Container fluid>

            <Navbar style={{ backgroundColor: 'lightblue', marginTop: '10px' }}>

                <Navbar.Brand style={{ paddingLeft: '10px' }}>Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link ></Nav.Link>
                        <Nav.Link ></Nav.Link>
                        <Nav.Link ></Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        </Container>

    )
}
