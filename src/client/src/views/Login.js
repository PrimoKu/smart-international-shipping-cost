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
    Col,
} from "reactstrap";


function Login() {
    // const [email, setEmail] = useState("yku4@jh.edu");
    // const [password, setPassword] = useState("ku850728");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [imageSize] = useState(60);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        axios.post('http://localhost:8080/api/users/login', formData, { withCredentials: true })
        .then(res => {
            window.location.assign('/admin/dashboard');
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                setLoginError(error.response.data.message);
            }
        });
    };

    const controls = useAnimation();

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
        </div>
    );
}

export default Login;