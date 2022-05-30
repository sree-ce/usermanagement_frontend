import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import HomePage from '../../../pages/users/HomePage'
import './Login.css'

const Login = () => {
    const [err, setErr] = useState()
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [token, setToken] = useState()



    const handleSubmitLogin = async (e) => {
        try {
            const datas = {
                username: e.username,
                password: e.password
            }

            const { data } = await axios.post('http://127.0.0.1:8000/api/login/', datas)
            localStorage.setItem("accessToken", data.access)

            console.log(">>>>>>>>>>>>>>>>>");
            console.log(data);

            localStorage.setItem("refreshToken", data.refresh)
            const accessToken = localStorage.getItem("accessToken")
            console.log("accesstoken ", accessToken);


            if (accessToken) {
                const decode = jwt_decode(accessToken)

                console.log("decode unde");
                if (decode.is_superuser) {
                    navigate('/admin')
                }
                else {
                    console.log("else");
                    navigate('/home')
                }
            }

        } catch (error) {

            console.log(error.response.data.detail)
            setErr(error.response.data.detail)

        }


    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken')

        if (token) {
            setToken(token)
            navigate('/home')
        } else {
            navigate('/')
        }

    }, [])


    return (
        <Container className='main-container'>
            <Row>
                <div className='login_form'>
                    <Row>

                        <h2 style={{ color: "rgb(4, 53, 4)", textAlign: "center", marginTop: "10px" }}>Login</h2>

                        {token ? (<HomePage />) : (<div className=''>

                            <Form onSubmit={handleSubmit(handleSubmitLogin)}>
                                <p className='text-danger'>{err}</p>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>
                                        Username
                                    </Form.Label>
                                    <Form.Control type="text"
                                        {...register("username", { required: "username is required", minLength: { value: 4, message: "Should contain 4 characters" } })}
                                        placeholder="Enter username" />
                                    <Form.Text>
                                        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                                    </Form.Text>

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"
                                        {...register("password", { required: "password is required" })}
                                        placeholder="Password" />
                                    <Form.Text>
                                        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                                    </Form.Text>
                                </Form.Group>

                                <Button type="submit" className='btn'>
                                    Submit
                                </Button>


                            </Form>
                            <Button type="" onClick={() => navigate('/signup')}
                                className='btn'>
                                Signup
                            </Button>
                        </div>)}
                    </Row>
                </div>
            </Row>
        </Container>
    )
}

export default Login
