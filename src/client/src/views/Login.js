import React, { useState } from "react";
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/img/Logo.png';
import earth from '../assets/img/earth.png';
import plane from '../assets/img/plane.jpg';
import '../assets/css/image.css';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    FormGroup,
    Form,
    Input,
    Row,
    Col, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import { GoogleLogin } from '@react-oauth/google';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(""); 
    const [loginError, setLoginError] = useState("");
    const [imageSize] = useState(60);

    const [confirmModal, setConfirmModal] = useState(false);
    const [confirmModalCancelable, setConfirmModalCancelable] = useState(true);

    const toggleConfirmModal = () => {
        setConfirmModal(!confirmModal);
        setConfirmModalCancelable(true);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, formData, { withCredentials: true })
        .then(res => {
            if (role === "1") {  // If the role is "shipper"
                window.location.assign('/shipper/dashboard');  // Redirect to shipper's dashboard, this need to be changed
            } else {
                window.location.assign('/admin/dashboard');  // For regular users
            }
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                setLoginError(error.response.data.message);
            }
        });
    };

    const googleSuccess = async (response) => {
        // const userObject = jwtDecode(response.credential);
        try {
            const res = await axios.post("http://localhost:8080/api/auth/google", {token: response.credential} , { withCredentials: true });

            if (res.data.isNewUser) {
                toggleConfirmModal();
            } else {
                if (role === "1") {  // If the role is "shipper"
                    window.location.assign('/shipper/dashboard');  // Redirect to shipper's dashboard, this need to be changed
                } else {
                    window.location.assign('/admin/dashboard');  // For regular users
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const confirmRoleRegister = async (e) => {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append('role', role);
        formData.append('google_login', true);

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/register`, formData, { withCredentials: true })
        .then(response => {
            window.location.assign('/admin/dashboard');
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                console.log(error);
            }
        });
    }

    const controls = useAnimation();

    // controls the flying airplane animation
    useEffect(() => {
        const sequence = async () => {
            await controls.start({ pathOffset: 0 });
            await controls.start({ pathOffset: 1, rotate: 180 });
            await controls.start({ pathOffset: 0, rotate: 0 });
        };
        sequence();
    }, [controls]);

    return (
        <div className="content" style={{ overflowX: 'hidden' }}>
            <Row className="justify-content-center">
                <Col xl="10" lg="12" md="9">
                    <Card className="o-hidden border-0 shadow-lg my-5 py-5">
                        <CardHeader>
                            <h1 className="text-center title mt-5">Welcome Back!</h1>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg="6" className="d-flex justify-content-center align-items-center">
                                    <div className="image-container">
                                        <img src={logo} style={{ width: `${imageSize}%` }} alt="Logo" />
                                    </div>
                                </Col>
                                <Col lg="6">
                                    <h2 className="text-center title mt-5">Login</h2>
                                    <svg width="1500" height="100">
                                        <image xlinkHref={earth} x="50" y="55" width="20" height="20"/>
                                        <image xlinkHref={earth} x="950" y="55" width="20" height="20"/>
                                        
                                        <motion.image 
                                            xlinkHref={plane} 
                                            x="10" 
                                            y="50" 
                                            width="30" 
                                            height="30"
                                            animate={{
                                                x: [150, 920, 5]
                                            }}
                                            transition={{
                                                duration: 15,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        />
                                    </svg>
                                    
                                    <div className="px-5">
                                        <Form onSubmit={handleSubmit} id="form_user">
                                            <FormGroup>
                                                <Input
                                                    type="email"
                                                    className="form-control-user"
                                                    name="email"
                                                    placeholder="Email"
                                                    required
                                                    style={{ height: '50px', fontSize: '18px' }}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    // defaultValue={"testUser@jhu.edu"}
                                                    // readOnly
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    type="password"
                                                    className="form-control-user"
                                                    name="password"
                                                    placeholder="Password"
                                                    required
                                                    autoComplete="off"
                                                    style={{ height: '50px', fontSize: '18px' }}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    // defaultValue={"Default Password"}
                                                    // readOnly
                                                />
                                                <div className="text-warning" id="login_error"></div>
                                            </FormGroup>
                                            <div className="text-danger" id="login_error">{loginError}</div>
                                            <Button type="submit" className="btn-info" block>
                                                Login
                                            </Button>
                                        </Form>
                                        <hr />
                                        <GoogleLogin
                                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                            render={(renderProps) => (
                                                <button
                                                type="button"
                                                className=""
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                                >
                                                Sign in with google
                                                </button>
                                            )}
                                            onSuccess={googleSuccess}
                                            // onFailure={}
                                            cookiePolicy="single_host_origin"
                                            />
                                        <hr />
                                        <div className="text-center">
                                            <h6 className="text-center my-3" style={{ fontSize: '14px' }}>Don't have an account yet?</h6>
                                            <a className="text-info" href="/register">Register</a>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={confirmModal} toggle={toggleConfirmModal}>
                <ModalHeader toggle={toggleConfirmModal}>
                    <div className="text-dark mb-0" style={{fontSize: '30px'}}>Welcome New User!</div>
                </ModalHeader>
                <Form id="form_invite" onSubmit={confirmRoleRegister}>
                    <ModalBody style={{height: '75px'}}>
                        <div className="text-dark">
                            <FormGroup>
                                <Input
                                    type="select"
                                    className="form-control-user"
                                    style={{ height: '50px', fontSize: '18px', color: 'black' }}
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="" disabled selected>Choose your role</option>
                                    <option value="0">Normal</option>
                                    <option value="1">Shipper</option>
                                </Input>
                            </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
                        <Button type="submit" className="btn-success mx-1">Confirm</Button>
                        <Button className="btn-secondary mx-1" onClick={toggleConfirmModal} style={confirmModalCancelable ? {} : { display: 'none' }}>Close</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}

export default Login;