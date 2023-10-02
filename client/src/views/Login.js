import React, { useState } from "react";
import axios from 'axios';
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        axios.post('http://localhost:8080/api/users/login', formData, { withCredentials: true })
        .then(res => {
            console.log(res);
            window.location.assign('/');
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                setLoginError(error.response.data.message);
            }
        });
    };

    return (
        <div className="content" style={{ overflowX: 'hidden' }}>
            <Row className="justify-content-center">
                <Col xl="10" lg="12" md="9">
                    <Card className="o-hidden border-0 shadow-lg my-5 py-5">
                        <CardHeader>
                            <h1 className="text-center title mt-5">Login</h1>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg>
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