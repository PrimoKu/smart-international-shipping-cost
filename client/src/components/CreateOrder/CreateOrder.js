import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [order, setOrder] = useState({
    name: '',
    price: '',
    weight: '',
    date: '',
  });
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (Object.values(order).every((field) => field !== '')) {
      // Store the order information
      // For now, just console log
      console.log('Order:', order);

      // Redirect to dashboard
      navigate('/admin/dashboard');
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
                <FormGroup>
                  <Label for='date'>Date</Label>
                  <Input
                    type='date'
                    id='date'
                    value={order.date}
                    onChange={(e) => setOrder({ ...order, date: e.target.value })}
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

