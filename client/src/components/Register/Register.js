import React, { useState } from 'react';
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function Register() {
  const [accountType, setAccountType] = useState(''); // State to hold selected account type
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleAccountTypeSelect = (type) => {
    setAccountType(type);
  };

  return (
    <div className='wrapper'>
      <div className='main-panel'>
        <div className='navbar'>
          <h1 className='brand-text'>Register Here</h1>
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
                    <CardTitle tag='h3'>Create Your Account</CardTitle>
                    <Form>
                      <FormGroup>
                        <Label for='fullname'>Full Name</Label>
                        <Input
                          type='text'
                          id='fullname'
                          placeholder='Enter your full name'
                        />
                      </FormGroup>
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
                      <FormGroup>
                        <Label for='accountType'>Account Type</Label>
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                          <DropdownToggle caret>
                            {accountType ? accountType : 'Select account type'}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={() => handleAccountTypeSelect('joiner')}
                            >
                              Joiner
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleAccountTypeSelect('manager')}
                            >
                              Manager
                            </DropdownItem>
                            <DropdownItem
                              onClick={() => handleAccountTypeSelect('shipper')}
                            >
                              Shipper
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </FormGroup>
                      <Button color='info' size='lg' block>
                        Register
                      </Button>
                    </Form>
                    <p className='mt-3'>
                      Already have an account?{' '}
                      <Link to='/login'>Login here</Link>.
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

export default Register;
