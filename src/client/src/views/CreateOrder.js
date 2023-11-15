import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

function CreateOrder() {
  const location = useLocation();
  const groupOrderId = location.state?.groupOrder_id;
  const [order, setOrder] = useState({
    name: '',
    price: '',
    weight: '',
    groupOrder_id: '',
    date: '',
  });
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalCancelable, setModalCancelable] = useState(true);
  const navigate = useNavigate();

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
  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('name', order.name);
    formData.append('price', order.price);
    formData.append('weight', order.weight);
    formData.append('groupOrder_id', groupOrderId);

    axios.post('http://localhost:8080/api/orders', formData, { withCredentials: true })
    .then(response => {
        showModal("Order", "Create succeeded!", true);
    })
    .catch((error) => {
        if (error.response && error.response.data) {
            console.log(error.response);
        }
    });
  };

    
  const handleModalClosed = () => {
    window.location.assign(`/admin/groupOrder/${groupOrderId}`);
  }
  return (
    <div className='wrapper'>
      <div className='main-panel'>
        <div className='navbar'>
          <h1 className='brand-text'>Create Order</h1>
        </div>
        <div className='center-content'>
          <Card className='text-center'>
            <CardBody>
              <CardTitle tag='h3'>Fill Order Details</CardTitle>
              <Form>
                <FormGroup>
                  <Label for='name'>Order Name</Label>
                  <Input
                    type='text'
                    id='name'
                    placeholder='Enter order name'
                    value={order.name}
                    onChange={(e) => setOrder({ ...order, name: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='price'>Price</Label>
                  <Input
                    type='number'
                    id='price'
                    placeholder='Enter price'
                    value={order.price}
                    onChange={(e) => setOrder({ ...order, price: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='weight'>Weight</Label>
                  <Input
                    type='number'
                    id='weight'
                    placeholder='Enter weight'
                    value={order.weight}
                    onChange={(e) => setOrder({ ...order, weight: e.target.value })}
                  />
                </FormGroup>
                <Button color='info' size='lg' block onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
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
        <Link to='/admin/dashboard'>
        <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default CreateOrder;

