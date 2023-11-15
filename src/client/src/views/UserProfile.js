import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "contexts/AuthContext.js";

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
  const [showShipmentEdit, setShowShipmentEdit] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const { user } = useAuth();

  const [shipmentDetails, setShipmentDetails] = useState({
    // _id: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    zipCode: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    // _id: '',
    cardType: '',
    cardNumber: '',
    bankName: '',
    billAddress1: '',
    billAddress2: '',
    state: '',
    city: '',
    zipCode: '',
  });

  console.log(user)

  const updateShipment = async () => {
    let formData = new FormData();
    // formData.append('id', user.shipment._id);
    formData.append('firstName', user.shipment.firstName);
    formData.append('lastName', user.shipment.lastName);
    formData.append('address1', user.shipment.address_1);
    formData.append('address2', user.shipment.address_2);
    formData.append('state', user.shipment.state);
    formData.append('city', user.shipment.city);
    formData.append('zipCode', user.shipment.zip_code);

    axios.post('http://localhost:8080/api/shipments/upsert', formData, { withCredentials: true })
      .then(response => {
          window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response);
        }
      });
  };

  const updatePayment = async () => {
    let formData = new FormData();
    // formData.append('id', user.shipment._id);
    formData.append('cardType', user.payment.card_type);
    formData.append('cardNumber', user.payment.card_number);
    formData.append('bankName', user.payment.bank_name);
    formData.append('billAddress1', user.payment.bill_address_1);
    formData.append('billAddress2', user.payment.bill_address_2);
    formData.append('state', user.payment.state);
    formData.append('city', user.payment.city);
    formData.append('zipCode', user.payment.zip_code);

    axios.post('http://localhost:8080/api/payments/upsert', formData, { withCredentials: true })
      .then(response => {
          window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response);
        }
      });
  };

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
                    <p>User ID: {user?._id ?? "defaultId"}</p>
                    <p>User Name: {user?.name || 'Loading...'}</p>
                    <p>Email: {user?.email || 'Loading...'}</p>
                  </div>
                ) : (
                  <Form>
                    <Row>
                      {/* User ID & User Name */}
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <Label>User ID</Label>
                          <Input value={user?._id || ""} placeholder="User ID" type="text" disabled />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label>User Name</Label>
                          <Input value={user?.name || ""} placeholder="User Name" type="text" />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      {/* Email & Password */}
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <Label>Email</Label>
                          <Input value={user?.email || ""} placeholder="Email" type="email" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label>Password</Label>
                          <Input placeholder="Password" type="password" />
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


            <Card>
              <CardHeader>
                <h2 className="title">Shipment Information</h2>
              </CardHeader>
              <CardBody>
                {!showShipmentEdit ? (
                  <div>
                    <p>First Name: {user?.shipment.first_name || '[Current None]'}</p>
                    <p>Last Name: {user?.shipment.last_name || '[Current None]'}</p>
                    <p>Address 1: {user?.shipment.address_1 || '[Current None]'}</p>
                    <p>Address 2: {user?.shipment.address_2 || '[Current None]'}</p>
                    <p>City: {user?.shipment.city || '[Current None]'}</p>
                    <p>State: {user?.shipment.state || '[Current None]'}</p>
                    <p>Zip Code: {user?.shipment.zip_code || '[Current None]'}</p>
                  </div>
                ) : (
                  <Form>
                    <Row>
                      <Col className="1" md="5">
                        <FormGroup>
                          <Label>First Name</Label>
                          {<Input
                            placeholder="First Name"
                            type="text"
                            value={shipmentDetails.firstName}
                            onChange={e => setShipmentDetails(e.target.value )}
                          />}
                        </FormGroup>
                      </Col>
                      <Col className="2" md="3">
                        <FormGroup>
                          <Label>Last Name</Label>
                          {<Input
                            value={shipmentDetails.lastName}
                            onChange={e => setShipmentDetails(e.target.value)}
                            placeholder="Last Name"
                            type="text"
                          />}
                        </FormGroup>
                      </Col>
                      <Col className="3" md="4">
                        <FormGroup>
                          <Label>Address 1</Label>
                          {<Input
                            value={shipmentDetails.address1}
                            onChange={e => setShipmentDetails(e.target.value)}
                            placeholder="Address 1"
                            type="text"
                          />}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="4" md="5">
                        <FormGroup>
                          <Label>Address 2</Label>
                          {<Input
                            value={shipmentDetails.address2}
                            onChange={e => setShipmentDetails(e.target.value)}
                            placeholder="Address 2"
                            type="text"
                          />}
                        </FormGroup>
                      </Col>
                      <Col className="5" md="7">
                        <FormGroup>
                          <Label>City</Label>
                          {<Input
                            value={shipmentDetails.city}
                            onChange={e => setShipmentDetails(e.target.value)}
                            placeholder="City"
                            type="text"
                          />}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="6" md="5">
                        <FormGroup>
                          <Label>State</Label>
                          {<Input
                            value={shipmentDetails.state}
                            onChange={e => setShipmentDetails(e.target.value)}
                            placeholder="State"
                            type="text"
                          />}
                        </FormGroup>
                      </Col>
                      <Col className="7" md="3">
                        <FormGroup>
                          <Label  for='zipCode'>Zip Code</Label>
                          <Input
                            value={shipmentDetails.zipCode}
                            onChange={e => setState({ ...shipmentDetails, zipCode: e.target.value })}
                            placeholder="Zip Code"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                )}
              </CardBody>
              <CardFooter>
                <Button onClick={() => setShowShipmentEdit(!showShipmentEdit)}>
                  {showShipmentEdit ? "Cancel" : "Edit"}
                </Button>
                {showShipmentEdit && <Button onClick={() => {
                    updateShipment(); 
                    setShowShipmentEdit(false);
                }}>Confirm</Button>}
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
                    <p>Bank Name: {user?.payment.bank_name || 'Loading...'}</p>
                    <p>Card Type: {user?.payment.card_type || 'Loading...'}</p>
                    <p>Bank Account Number: {user?.payment.card_number || 'Loading...'}</p>
                    <p>Bill Address 1: {user?.payment.bill_address_1 || 'Loading...'}</p>
                    <p>Bill Address 2: {user?.payment.bill_address_2 || '[Current None]'}</p>
                    <p>State: {user?.payment.state || '[Current None]'}</p>
                    <p>City: {user?.payment.city || 'Loading...'}</p>
                    <p>Zip Code: {user?.payment.zip_code || 'Loading...'}</p>
                  </div>
                ) : (
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>Credit Card Type</Label>
                          {<Input
                            value={user.payment.card_type}
                            onChange={e => setPaymentDetails(e.target.value)}
                            placeholder="Address 2"
                            type="text"
                          />}
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <Label>Bank Name</Label>
                          {<Input
                            value={user.payment.bank_name}
                            onChange={e => setPaymentDetails(e.target.value)}
                            placeholder="Bank Name"
                            type="text"
                          />}
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label>Bank Account Number</Label>
                          {<Input
                            value={user.payment.card_number}
                            onChange={e => setPaymentDetails(e.target.value)}
                            placeholder="Bank Account Number"
                            type="text"
                          />}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>Bill Address 1</Label>
                          {<Input
                            value={user.payment.bill_address_1}
                            onChange={e => setPaymentDetails(e.target.value)}
                            placeholder="Bill Address 1"
                            type="text"
                          />}
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="7">
                        <FormGroup>
                          <Label>Bill Address 2</Label>
                          <Input
                            value={user.payment.bill_address_2}
                            onChange={e => setPaymentDetails(e.target.value)}
                            placeholder="Bill Address 2"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>State</Label>
                          <Input
                            value={user.payment.state}
                            onChange={e => setPaymentDetails(e.target.value)}
                            placeholder="State"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <Label>City</Label>
                          <Input
                            value={user.payment.city}
                            onChange={e => setPaymentDetails(e.target.value)}
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label>Zip Code</Label>
                          <Input
                            value={user.payment.zipCode}
                            onChange={e => setPaymentDetails(e.target.value)}
                            placeholder="Zip Code"
                            type="text"
                          />
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
                {showPaymentEdit && <Button onClick={() => {
                    updatePayment(); 
                    setShowPaymentEdit(false);
                }}>Confirm</Button>}
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
