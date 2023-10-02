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
    Col, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [validationError, setValidationError] = useState("");
    const [modal, setModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalCancelable, setModalCancelable] = useState(true);
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        handlePasswordCheckInput(e.target.value, passwordCheck);
    }

    const handleConfirmPasswordChange = (e) => {
        setPasswordCheck(e.target.value);
        handlePasswordCheckInput(password, e.target.value);
    }

    const handlePasswordCheckInput = (password, passwordCheck) => {
        if (password && passwordCheck) {
            if (password === passwordCheck) {
                setPasswordMatchError('Passwords matched!');
            } else {
                setPasswordMatchError("Passwords don't match!");
            }
        } else {
            setPasswordMatchError('');
        }
    };

    const toggleModal = () => {
        if (modalCancelable) {
          setModal(!modal);
        }
    };
    const showModal = (title, content, cancelable = true) => {
        setModalTitle(title);
        setModalContent(content);
        setModalCancelable(cancelable);
        setModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        axios.post('http://localhost:8080/api/users/register', formData)
        .then(response => {
            showModal("BlueJay", "Register succeeded!", true);
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                setEmailError(error.response.data.email_msg);
                setValidationError(error.response.data.errors[0].msg);
            }
        });
    };

    const handleModalClosed = () => {
        window.location.assign('/');
    }

    return (
        <div className="content" style={{ overflowX: 'hidden' }}>
            <Row className="justify-content-center">
                <Col xl="10" lg="12" md="9">
                    <Card className="o-hidden border-0 shadow-lg my-5 py-5">
                        <CardHeader>
                            <h1 className="text-center title mt-5">Register</h1>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg>
                                    <div className="px-5">
                                        <Form onSubmit={handleSubmit} id="form_user">
                                            <FormGroup>
                                                <Input
                                                    type="name"
                                                    className="form-control-user"
                                                    name="name"
                                                    placeholder="Name"
                                                    required
                                                    style={{ height: '50px', fontSize: '18px' }}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </FormGroup>
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
                                                <div className="text-danger" id="email_error">{emailError}</div>
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
                                                    onChange={handlePasswordChange}
                                                />
                                                <div className="text-warning" id="login_error"></div>
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    type="password"
                                                    className="form-control-user"
                                                    name="password_check"
                                                    id="password_check"
                                                    placeholder="Confirm Password"
                                                    required
                                                    autoComplete="off"
                                                    style={{ height: '50px', fontSize: '18px' }}
                                                    onChange={handleConfirmPasswordChange}
                                                />
                                                <div className={password === passwordCheck ? "text-success" : "text-warning"} id="password_match_error">{passwordMatchError}</div>
                                            </FormGroup>
                                            <div className="text-danger" id="validation_error">{validationError}</div>
                                            <Button type="submit" className="btn-info" block>
                                                Register
                                            </Button>
                                        </Form>
                                        <hr />
                                        <div className="text-center">
                                            <h6 className="text-center my-3" style={{ fontSize: '14px' }}>Already have an account?</h6>
                                            <a className="text-info" href="/login" >Login</a>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggleModal} keyboard={modalCancelable} onClosed={handleModalClosed}>
                <ModalHeader toggle={toggleModal}>
                    <div className="text-dark mb-0" style={{fontSize: '30px'}}>{modalTitle}</div>
                </ModalHeader>
                <ModalBody style={{height: '75px'}}><p style={{fontSize: '20px'}}>{modalContent}</p></ModalBody>
                <ModalFooter style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
                    <Button color="secondary" onClick={toggleModal} style={modalCancelable ? {} : { display: 'none' }}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
        
    );
}

export default Register;