import React, { useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Header from '../../component/users/Header/Header'
import { useNavigate } from 'react-router-dom'



export const LandingPage = () => {
    const navigate = useNavigate()


    return (
        <>

            <Container>

                <Row>
                    <Col sm={6}>

                        <Card>
                            <Card.Body className='shadow-lg' ><button style={{ border: "none", backgroundColor: "white", color: "green" }} onClick={() => {
                                navigate('/signup')
                            }}>Go to signup</button></Card.Body>
                        </Card>
                    </Col>

                    <Col sm={6}>

                        <Card>
                            <Card.Body className='shadow-lg'>  <button style={{ border: "none", backgroundColor: "white", color: "green" }} onClick={() => {
                                navigate('/login')
                            }}>Go to login</button></Card.Body>
                        </Card>
                    </Col>
                </Row>


            </Container>

        </>

    )
}
