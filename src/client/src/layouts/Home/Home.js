import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from 'assets/img/react-logo.png';

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/orders/`, { withCredentials: true });
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error("An error occurred while fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='wrapper'>
      <div className='main-panel'>
        <div className='navbar'>
          <h1 className='brand-text'>Welcome</h1>
        </div>
        <div className='center-content'>
          <Card className='text-center'>
            <CardBody>
              <CardTitle tag='h3'>Get Started</CardTitle>
              <Link to='/login'>
                <Button color='info' size='lg' className='mr-3'>
                  Login
                </Button>
              </Link>
              <Link to='/register'>
                <Button color='success' size='lg'>
                  Register
                </Button>
              </Link>
            </CardBody>
          </Card>
          <Card className='text-center'>
            <CardBody>
              <CardTitle tag='h3'>Manage Your Orders</CardTitle>
              <Link to='/main'>
                <Button color='info' size='lg' className='mr-3'>
                  Orders
                </Button>
              </Link>
            </CardBody>
          </Card>
          <div className="App">
            <h1>All Order Information</h1>
             <Link to='/checkout'>
                <Button color='info' size='lg' className='mr-3'>
                  Checkout
                </Button>
              </Link>
            <ul>
              {data.map(item => (
                <li key={item._id}> Name: {item.name}, Weight: {item.weight}, Price: {item.price} </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
