import React from 'react';
import { Link } from 'react-router-dom';
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

// Existing imports...

function Login() {
  return (
    <div className='wrapper'>
      <div className='main-panel'>
        <div className='navbar'>
          <h1 className='brand-text'>Login Here</h1>
        </div>
        {/* Content for the main panel */}
        <div
          className='center-content d-flex align-items-center'
          style={{ minHeight: '80vh' }}
        >
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <Card className='text-center'>
                  <CardBody>
                    <CardTitle tag='h3'>Login to Your Account</CardTitle>
                    <Form>
                      <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input
                          type='email'
                          id='email'
                          placeholder='Enter your email'
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for='password'>Password</Label>
                        <Input
                          type='password'
                          id='password'
                          placeholder='Enter your password'
                        />
                      </FormGroup>
                      <Link to='/admin'>
                        <Button color='info' size='lg' block>
                          Login
                        </Button>
                      </Link>
                    </Form>
                    <p className='mt-3'>
                      Don't have an account?{' '}
                      <Link to='/register'>Register here</Link>.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
