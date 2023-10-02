import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

import logo from 'assets/img/react-logo.png';

function Home() {
  return (
    <div className='wrapper'>
      <div className='main-panel'>
        <div className='navbar'>
          <h1 className='brand-text'>Welcome</h1>
        </div>
        {/* Content for the main panel */}
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
              <CardTitle tag='h3'>Create a shipping order</CardTitle>
              <Link to='/createorder'>
                <Button color='info' size='lg' className='mr-3'>
                  Create
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
