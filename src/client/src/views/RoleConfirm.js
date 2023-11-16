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


function RoleConfirm() {
    const [role, setRole] = useState(""); 
    const [modal, setModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalCancelable, setModalCancelable] = useState(true);

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
        formData.append('role', role);

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/register`, formData, { withCredentials: true })
        .then(response => {
            showModal("BlueJay", "Register succeeded!", true);
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                console.log(error);
            }
        });
    };

    const handleModalClosed = () => {
        window.location.assign('/admin/dashboard');
    }

    return (
        <div className="content" style={{ overflowX: 'hidden' }}>
            <Row className="justify-content-center">
                <Col xl="10" lg="12" md="9">
                    <Card className="o-hidden border-0 shadow-lg my-5 py-5">
                        <CardHeader>
                            <h1 className="text-center title mt-5">Confirm Your Role</h1>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg>
                                    <div className="px-5">
                                        <Form onSubmit={handleSubmit} id="form_user">
                                            <FormGroup>
                                                <Input
                                                    type="select"
                                                    className="form-control-user"
                                                    style={{ height: '50px', fontSize: '18px' }}
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                    required
                                                >
                                                    <option value="" disabled>Select a role</option>
                                                    <option value="0">User</option>
                                                    <option value="1">Shipper</option>
                                                </Input>
                                            </FormGroup>
                                            <Button type="submit" className="btn-info" block>
                                                Confirm
                                            </Button>
                                        </Form>
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

export default RoleConfirm;