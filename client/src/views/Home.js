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
        const response = await axios.get('http://localhost:8080/api/orders/', { withCredentials: true });
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
        </div>
      </div>
    </div>
  );
}

export default Home;
