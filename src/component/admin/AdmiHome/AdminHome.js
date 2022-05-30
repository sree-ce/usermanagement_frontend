import React, { useEffect, useState } from 'react'
import { Container, Table, Modal, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './AdminHome.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import jwt_decode from "jwt-decode";



export const AdminHome = () => {
    const navigate = useNavigate()
    const [tokens, setTokens] = useState()
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const [details, setDetails] = useState();

    const [shows, setShows] = useState(false);
    const handleCloses = () => setShows(false);
    const handleShows = () => setShows(true);


    const [show, setShow] = useState("");

    const [smShow, setSmShow] = useState("");

    const logoutHandler = async () => {
        localStorage.removeItem("accessToken")
        navigate('/')

    }

    const handleClose = async () => {

        const data = {}
        try {
            const { data } = await axios.put(`http://127.0.0.1:8000/api/users/user/${show.id}/`, show)
            setShow("")
            getUsers();
        } catch (error) {
            console.log("wertyutreert");
            console.log(error);
        }
    };


    const handleShow = (value) => {
        console.log(value);
        setShow(value)
    };

    const [err, setErr] = useState('')
    const handleSubmitSignup = async (data) => {
        const datas = {
            username: data.username,
            email: data.email,
            password: data.password
        }

        try {

            const response = await axios.post('http://127.0.0.1:8000/api/signup/', datas)
            getUsers();
            handleCloses()


        } catch (err) {
            console.log(err.response.data.email[0])
            setErr(err.response.data.email[0])

        }

    }

    const getUsers = async () => {
        const { data } = await axios.get('http://127.0.0.1:8000/api/users/user/');

        console.log(data);
        setDetails(data);
    };
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        const decode = jwt_decode(token)
        if (decode.is_superuser) {
            setTokens(decode)
        }
        getUsers();
    }, []);

    const DeleteUser = async () => {

        await axios.delete(`http://127.0.0.1:8000/api/users/user/${smShow.id}/`)

        getUsers()
        setSmShow(false)



    }


    return (
        <Container fluid>


            {tokens ? (<div>

                <Table striped bordered hover style={{ padding: '10px', marginTop: '30px' }}>
                    <thead>
                        <tr>
                            <th>SI.</th>

                            <th>Username</th>
                            <th>E-mail</th>

                            <th>Edit</th>

                            <th>Delete</th>
                            <th><button style={{ backgroundColor: "green", color: 'white' }} onClick={handleShows}>Add</button></th>
                            <th><button style={{ backgroundColor: "green", color: 'white' }} onClick={logoutHandler}>Logout</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {details &&
                            details.map((value, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{value.username}</td>
                                    <td>{value.email}</td>

                                    <td>
                                        <button style={{ backgroundColor: "blue", color: 'white' }} onClick={() => handleShow(value)}>Edit</button>
                                        {show && <Modal show={show ? true : false} onHide={handleClose} animation={false}>
                                            <Form>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Edit User</Modal.Title>
                                                </Modal.Header>

                                                <Modal.Body>


                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>username</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            value={show.username}
                                                            onChange={(e) => setShow({ ...show, username: e.target.value })}
                                                            placeholder="Enter username" />

                                                    </Form.Group>

                                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                                        <Form.Label>email</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            value={show.email}
                                                            onChange={(e) => setShow({ ...show, email: e.target.value })}
                                                            placeholder="email" />
                                                    </Form.Group>


                                                </Modal.Body>

                                                <Modal.Footer>

                                                    <Button variant="primary" onClick={handleClose}>
                                                        Save Changes
                                                    </Button>
                                                </Modal.Footer>
                                            </Form>
                                        </Modal>}
                                    </td>

                                    <td>
                                        <button onClick={() => setSmShow(value)} style={{ backgroundColor: "red", color: 'white' }}>Delete</button>
                                        {smShow && <Modal
                                            smShow={smShow ? true : false}
                                            size="sm"
                                            show={smShow}
                                            onHide={() => setSmShow(false)}
                                            aria-labelledby="example-modal-sizes-title-sm"
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="example-modal-sizes-title-sm">
                                                    Delete User
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Are you sure? </Modal.Body>
                                            <Modal.Footer>
                                                <Button onClick={() => DeleteUser(smShow.id)}>Delete</Button>
                                            </Modal.Footer>
                                        </Modal>}
                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>
                </Table>

                <Modal show={shows} onHide={handleCloses}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                    </Modal.Body>

                </Modal>
            </div>) : ("Not found")}

        </Container>
    )
}
