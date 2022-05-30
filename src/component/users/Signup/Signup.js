import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Signup.css'

export const Signup = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const [err, setErr] = useState('')
    const handleSubmitSignup = async (data) => {
        const datas = {
            username: data.username,
            email: data.email,
            password: data.password
        }

        try {

            const response = await axios.post('http://127.0.0.1:8000/api/signup/', datas)
            navigate('/')



        } catch (err) {
            console.log(err.response.data.username)
            setErr(err.response.data.username)


        }

    }

    return (
        <Container className='main-container'>
            <Row>


                <div className='signupform'>
                    <Row>
                        <h2 style={{ color: "rgb(4, 53, 4)", textAlign: "center", marginTop: "10px" }}>Register</h2>
                        <p className='text-danger'>{err}</p>


                        <Form onClick={handleSubmit(handleSubmitSignup)}>



                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>username</Form.Label>
                                <Form.Control type="email"
                                    {...register("username", { required: "username is required", minLength: { value: 4, message: "Should contain 4 characters" } })}
                                    placeholder="Enter username" />

                                {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>email address</Form.Label>
                                <Form.Control type="email"
                                    {...register("email", { required: "email is required" })}
                                    placeholder="Enter email" />

                                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="password"
                                    {...register("password", { required: "password is required" })}
                                    placeholder="Password" />

                                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                            </Form.Group>



                            <Button type="submit" className='btn' >
                                Submit
                            </Button>
                        </Form>
                    </Row>

                </div>
            </Row>
        </Container>

    )
}
