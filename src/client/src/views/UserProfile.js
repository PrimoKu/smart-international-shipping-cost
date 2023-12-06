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

  const { user } = useAuth();

  const [shipmentDetails, setShipmentDetails] = useState({
    // _id: '',
    firstName: user.shipment?.first_name,
    lastName: user.shipment?.last_name,
    address1: user.shipment?.address_1,
    address2: user.shipment?.address_2,
    state: user.shipment?.state,
    city: user.shipment?.city,
    zipCode: user.shipment?.zip_code,
  });

  const [paymentDetails, setPaymentDetails] = useState({
    // _id: '',
    cardType: user.payment?.card_type,
    cardNumber: user.payment?.card_number,
    bankName: user.payment?.bank_name,
    billAddress1: user.payment?.bill_address_1,
    billAddress2: user.payment?.bill_address_2,
    state: user.payment?.state,
    city: user.payment?.city,
    zipCode: user.payment?.zip_code,
  });

  console.log(user)

  const updateShipment = async () => {
    let formData = new FormData();
    // formData.append('id', user.shipment._id);
    formData.append('firstName', shipmentDetails?.firstName);
    formData.append('lastName', shipmentDetails?.lastName);
    formData.append('address1', shipmentDetails?.address1);
    formData.append('address2', shipmentDetails?.address2);
    formData.append('state', shipmentDetails?.state);
    formData.append('city', shipmentDetails?.city);
    formData.append('zipCode', shipmentDetails?.zipCode);

    axios.post('http://localhost:8080/api/shipments/upsert', formData, { withCredentials: true })
      .then(response => {
          window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response);
        }
      });
  }

  const updatePayment = async () => {
    let formData = new FormData();
    // formData.append('id', user.shipment._id);
    formData.append('cardType', paymentDetails?.cardType);
    formData.append('cardNumber', paymentDetails?.cardNumber);
    formData.append('bankName', paymentDetails?.bankName);
    formData.append('billAddress1', paymentDetails?.billAddress1);
    formData.append('billAddress2', paymentDetails?.billAddress2);
    formData.append('state', paymentDetails?.state);
    formData.append('city', paymentDetails?.city);
    formData.append('zipCode', paymentDetails?.zipCode);

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
          <Col md="12">
            {/* User Information Card */}
            <Card>
              <CardHeader>
                <h2 className="title">User Information</h2>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    {/* User ID */}
                    <Col className="pr-md-1" md="4">
                    <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>User Name</Label>
                        {!showUserEdit ? (
                          <p className="form-control-static">{user?.name || 'Loading...'}</p>
                        ) : (
                          <Input value={user?.name || ""} placeholder="User Name" type="text" />
                        )}
                      </FormGroup>
                    </Col>
                    {/* User Name */}
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Email</Label>
                        {!showUserEdit ? (
                          <p className="form-control-static">{user?.email || 'Loading...'}</p>
                        ) : (
                          <Input value={user?.email || ""} placeholder="Email" type="email" />
                        )}
                      </FormGroup>
                    </Col>
                    {/* Email
                    <Col className="pr-md-1" md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Email</Label>
                        {!showUserEdit ? (
                          <p className="form-control-static">{user?.email || 'Loading...'}</p>
                        ) : (
                          <Input value={user?.email || ""} placeholder="Email" type="email" />
                        )}
                      </FormGroup>
                    </Col> */}
                  </Row>
                </Form>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="title">Shipment Information</h2>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>First Name</Label>
                        {!showShipmentEdit ? (
                          <p className="form-control-static">{user?.shipment?.first_name || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='firstName'
                            placeholder='First Name'
                            value={shipmentDetails.firstName}
                            onChange={(e) => setShipmentDetails({ ...shipmentDetails, firstName: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Last Name</Label>
                        {!showShipmentEdit ? (
                          <p className="form-control-static">{user?.shipment?.last_name || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='lastName'
                            placeholder='Last Name'
                            value={shipmentDetails.lastName}
                            onChange={(e) => setShipmentDetails({ ...shipmentDetails, lastName: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Address 1</Label>
                        {!showShipmentEdit ? (
                          <p className="form-control-static">{user?.shipment?.address_1 || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='address1'
                            placeholder='Address 1'
                            value={shipmentDetails.address1}
                            onChange={(e) => setShipmentDetails({ ...shipmentDetails, address1: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Address 2</Label>
                        {!showShipmentEdit ? (
                          <p className="form-control-static">{user?.shipment?.address_2 || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='address2'
                            placeholder='Address 2'
                            value={shipmentDetails.address2}
                            onChange={(e) => setShipmentDetails({ ...shipmentDetails, address2: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>City</Label>
                        {!showShipmentEdit ? (
                          <p className="form-control-static">{user?.shipment?.city || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='city'
                            placeholder='City'
                            value={shipmentDetails.city}
                            onChange={(e) => setShipmentDetails({ ...shipmentDetails, city: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>State</Label>
                        {!showShipmentEdit ? (
                          <p className="form-control-static">{user?.shipment?.state || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='state'
                            placeholder='Address 2'
                            value={shipmentDetails.state}
                            onChange={(e) => setShipmentDetails({ ...shipmentDetails, state: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Zip Code</Label>
                        {!showShipmentEdit ? (
                          <p className="form-control-static">{user?.shipment?.zip_code || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='zipCode'
                            placeholder='Zip Code'
                            value={shipmentDetails.state}
                            onChange={(e) => setShipmentDetails({ ...shipmentDetails, zipCode: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
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
        

            <Card>
              <CardHeader>
                <h2 className="title">Payment Information</h2>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Card Type</Label>
                        {!showPaymentEdit ? (
                          <p className="form-control-static">{user?.payment?.card_type || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='cardType'
                            placeholder='Card Type'
                            value={paymentDetails.cardType}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardType: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Card Number</Label>
                        {!showPaymentEdit ? (
                          <p className="form-control-static">{user?.payment?.card_number || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='cardNumber'
                            placeholder='Card Number'
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Bank Name</Label>
                        {!showPaymentEdit ? (
                          <p className="form-control-static">{user?.payment?.bank_name || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='bankName'
                            placeholder='Bank Name'
                            value={paymentDetails.bankName}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Billing Address 1</Label>
                        {!showPaymentEdit ? (
                          <p className="form-control-static">{user?.payment?.bill_address_1 || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='billAddress1'
                            placeholder='Billing Address 1'
                            value={paymentDetails.billAddress1}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, billAddress1: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Billing Address 2</Label>
                        {!showPaymentEdit ? (
                          <p className="form-control-static">{user?.payment?.bill_address_2 || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='billAddress2'
                            placeholder='Billing Address 2'
                            value={paymentDetails.billAddress2}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, billAddress2: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>State</Label>
                        {!showPaymentEdit ? (
                          <p className="form-control-static">{user?.payment?.state || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='state'
                            placeholder='State'
                            value={paymentDetails.state}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, state: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>City</Label>
                        {!showPaymentEdit ? (
                          <p className="form-control-static">{user?.payment?.city || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='city'
                            placeholder='City'
                            value={paymentDetails.city}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, city: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label style={{ fontWeight: 'bold', color: 'white' }}>Zip Code</Label>
                        {!showPaymentEdit ? (
                          <p className="form-control-static">{user?.payment?.zip_code || '[None]'}</p>
                        ) : (
                          <Input
                            type='text'
                            id='zipCode'
                            placeholder='Zip Code'
                            value={paymentDetails.zipCode}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, zipCode: e.target.value })}
                          />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
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
