import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { Container, Row, Col } from 'react-bootstrap';
import LoginPage from '../../../pages/users/LoginPage';
import Login from '../Login/Login';
// import './Home.css'

const Home = () => {
    const navigate = useNavigate()

    const token = localStorage.getItem('accessToken')
    const decode = jwt_decode(token)

    return (
        <>
            <Container>
                <Row className='text-center' style={{ marginTop: '2rem' }}>
                    <Col sm={12}>
                        <div>
                            {token ? (<div>

                                <h1>Welcome {decode.username}</h1>

                            </div>) : (<Login />)}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Home