import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Modal, ModalHeader, ModalBody
} from 'reactstrap';

function CreateOrderModal({ isOpen, toggle, groupOrderId }) {
  const [order, setOrder] = useState({
    name: '',
    price: '',
    weight: '',
    groupOrder_id: groupOrderId,
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('name', order.name);
    formData.append('price', order.price);
    formData.append('weight', order.weight);
    formData.append('groupOrder_id', groupOrderId);

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/orders`, formData, { withCredentials: true });
      // After creating the order, close the modal and navigate.
      toggle(); // This closes the modal
      navigate(`/admin/groupOrder/${groupOrderId}`); // Navigate to the group order details page
    } catch (error) {
      console.log(error.response ? error.response : error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Order</ModalHeader>
      <ModalBody>
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
      </ModalBody>
    </Modal>
  );
}

export default CreateOrderModal;
