import React, { useEffect, useState } from "react";
import axios from 'axios';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,  // <-- Make sure this line is here
  FormGroup,
  Form,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";

function UserProfile() {
  const [showUserEdit, setShowUserEdit] = useState(false);
  const [showPaymentEdit, setShowPaymentEdit] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/current', { withCredentials: true });
        console.log(response);
        setData(response.data.user); // Adjusted based on response structure
      } catch (error) {
        console.error("An error occurred while fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            {/* User Information Card */}
            <Card>
              <CardHeader>
                <h2 className="title">User Information</h2>
              </CardHeader>
              <CardBody>
                {!showUserEdit ? (
                  <div>
                    <p>User ID: {data._id || 'Loading...'}</p>
                    <p>User Name: {data.name || 'Loading...'}</p>
                    <p>Email: {data.email || 'Loading...'}</p>
                    {/* The below fields are just placeholders as they were not provided in the given API */}
                    <p>Password: [Your Password]</p>
                    <p>Legal Name: [Your Legal Name]</p>
                    <p>Legal ID: [Your Legal ID]</p>
                    <p>Gender: [Your Gender]</p>
                    <p>Birth Date: [Your Birth Date]</p>
                  </div>
                ) : (
                <Form>
                    <Row>
                        {/* User ID & User Name */}
                        <Col className="pr-md-1" md="6">
                            <FormGroup>
                                <Label>User ID</Label>
                                <Input placeholder="User ID" type="text" />
                            </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                            <FormGroup>
                                <Label>User Name</Label>
                                <Input placeholder="User Name" type="text" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        {/* Email & Password */}
                        <Col className="pr-md-1" md="6">
                            <FormGroup>
                                <Label>Email</Label>
                                <Input placeholder="Email" type="email" />
                            </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                            <FormGroup>
                                <Label>Password</Label>
                                <Input placeholder="Password" type="password" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        {/* Legal Name & Legal ID */}
                        <Col className="pr-md-1" md="6">
                            <FormGroup>
                                <Label>Legal Name</Label>
                                <Input placeholder="Legal Name" type="text" />
                            </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                            <FormGroup>
                                <Label>Legal ID</Label>
                                <Input placeholder="Legal ID" type="text" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        {/* Gender & Birth Date */}
                        <Col className="pr-md-1" md="6">
                            <FormGroup>
                                <Label>Gender</Label>
                                <Input type="select">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                            <FormGroup>
                                <Label>Birth Date</Label>
                                <Input type="date" />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                )}
              </CardBody>
              <CardFooter>
                <Button onClick={() => setShowUserEdit(!showUserEdit)}>
                  {showUserEdit ? "Cancel" : "Edit"}
                </Button>
                {showUserEdit && <Button onClick={() => setShowUserEdit(false)}>Confirm</Button>}
              </CardFooter>
            </Card>

            {/* Payment Information Card */}
            <Card>
              <CardHeader>
                <h2 className="title">Payment Information</h2>
              </CardHeader>
              <CardBody>
                {!showPaymentEdit ? (
                  <div>
                  {/* The below fields are just placeholders as they were not provided in the given API */}
                  <p>Credit Card Type: [Your Credit Card Type]</p>
                  <p>Bank Name: [Your Bank Name]</p>
                  <p>Bank Account Number: [Your Bank Account Number]</p>
                  <p>Payment: [Your Payment]</p>
                  <p>Address 1: {data.shipment && data.shipment[0] ? data.shipment[0].address_1 : 'Loading...'}</p>
                  <p>Address 2: {data.shipment && data.shipment[0] ? data.shipment[0].address_2 : 'Loading...'}</p>
                  <p>State: {data.shipment && data.shipment[0] ? data.shipment[0].state : 'Loading...'}</p>
                  <p>City: {data.shipment && data.shipment[0] ? data.shipment[0].city : 'Loading...'}</p>
                  <p>Zip Code: {data.shipment && data.shipment[0] ? data.shipment[0].zip_code : 'Loading...'}</p>
                </div>
                ) : (
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>Credit Card Type</Label>
                          <Input placeholder="Credit Card Type" type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <Label>Bank Name</Label>
                          <Input placeholder="Bank Name" type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label>Bank Account Number</Label>
                          <Input placeholder="Bank Account Number" type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>Payment</Label>
                          <Input placeholder="Payment" type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="7">
                        <FormGroup>
                          <Label>Address 1</Label>
                          <Input placeholder="Address 1" type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>Address 2</Label>
                          <Input placeholder="Address 2 (optional)" type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <Label>State</Label>
                          <Input placeholder="State" type="text" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label>City</Label>
                          <Input placeholder="City" type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>Zip Code</Label>
                          <Input placeholder="Zip Code" type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                )}
              </CardBody>
              <CardFooter>
                <Button onClick={() => setShowPaymentEdit(!showPaymentEdit)}>
                  {showPaymentEdit ? "Cancel" : "Edit"}
                </Button>
                {showPaymentEdit && <Button onClick={() => setShowPaymentEdit(false)}>Confirm</Button>}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
