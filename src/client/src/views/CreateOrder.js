import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
} from 'reactstrap';

function CreateOrder() {
  const location = useLocation();
  const groupOrderId = location.state?.groupOrder_id;
  const [order, setOrder] = useState({
    name: '',
    price: '',
    weight: '',
    groupOrder_id: groupOrderId, // Set this directly since it's coming from location state
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append('name', order.name);
    formData.append('price', order.price);
    formData.append('weight', order.weight);
    formData.append('groupOrder_id', groupOrderId);

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/orders`, formData, { withCredentials: true });
      // If the request is successful, navigate to the admin dashboard or group order page.
      navigate(`/admin/groupOrder/${groupOrderId}`); // This replaces window.location.assign
    } catch (error) {
      console.log(error.response ? error.response : error);
    }
  };

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
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
