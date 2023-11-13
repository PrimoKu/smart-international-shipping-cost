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
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const { user } = useAuth();


  console.log(user)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8080/api/users/current', { withCredentials: true });
  //       console.log(response.data);
            
  //       if (response.data && response.data.user) { 
  //         if (response.data.user.shipment && response.data.user.shipment.length > 0) {
  //           const shipmentData = response.data.user.shipment[0];
  //           setFirstName(shipmentData.first_name);
  //           setLastName(shipmentData.last_name);
  //           setAddress1(shipmentData.address_1);
  //           setAddress2(shipmentData.address_2 || "");
  //           setState(shipmentData.state);
  //           setCity(shipmentData.city);
  //           setZipCode(shipmentData.zip_code);
  //         } else {
  //           // Reset the shipment related state variables if needed
  //           setFirstName("");
  //           setLastName("");
  //           setAddress1("");
  //           setAddress2("");
  //           setState("");
  //           setCity("");
  //           setZipCode("");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("An error occurred while fetching data", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const submitShipmentData = async () => {
    try {
        const response = await axios.post('http://localhost:8080/api/shipments', {
            firstName,
            lastName,
            address1,
            address2,
            state,
            city,
            zipCode
        }, { withCredentials: true });
        console.log(response.data);

        // // Optionally: Refetch user data after updating to reflect changes
        // fetchData();
    } catch (error) {
        console.error("Error posting shipment data", error);
    }
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
                    {/* The below fields are just placeholders as they were not provided in the given API */}
                    {/* <p>Password: [Your Password]</p> */}
                    <p>Legal First Name: {user?.shipment.first_name || 'Loading...'}</p>
                    <p>Legal Last Name: {user?.shipment.last_name || 'Loading...'}</p>
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

                    <Row>
                        {/* Legal Name & Legal ID */}
                        <Col className="pr-md-1" md="6">
                            <FormGroup>
                                <Label>Legal First Name</Label>
                                <Input placeholder="Legal First Name" type="text" />
                            </FormGroup>
                        </Col>
                        <Col className="pr-md-1" md="6">
                            <FormGroup>
                                <Label>Legal Last Name</Label>
                                <Input placeholder="Legal Last Name" type="text" />
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
                    {/* Displaying the shipment data if it exists */}
                    <p>Bank Name: {user?.payment.bank_name || 'Loading...'}</p>
                    <p>Card Type: {user?.payment.card_type || 'Loading...'}</p>
                    <p>Bank Account Number: {user?.payment.card_number || 'Loading...'}</p>
                    <p>Address 1: {user?.payment.bill_address_1 && user?.payment.bill_address_1.length > 0 ? user?.payment.bill_address_1 : 'Loading...'}</p>
                    <p>Address 2: {user?.payment.bill_address_2 && user?.payment.bill_address_2 > 0 ? user?.payment.bill_address_2 : '[Current None]'}</p>
                    <p>State: {user?.payment.state && user?.payment.state > 0 ? user?.payment.state : '[Current None]'}</p>
                    <p>City: {user?.shipment && user?.shipment.length > 0 ? user?.shipment[0].city : 'Loading...'}</p>
                    <p>Zip Code: {user?.shipment && user?.shipment.length > 0 ? user?.shipment[0].zip_code : 'Loading...'}</p>
                  </div>
                ) : (
                  <Form onSubmit={(e) => {
                      e.preventDefault();
                      const shipmentData = {
                        address1, address2, state, city, zipCode
                      };
                      submitShipmentData(shipmentData);
                    }}>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>Credit Card Type</Label>
                          {/* <Input
                            value={creditCardType}
                            onChange={e => setCreditCardType(e.target.value)}
                            placeholder="Credit Card Type"
                            type="text"
                          /> */}
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <Label>Bank Name</Label>
                          {/* <Input
                            value={bankName}
                            onChange={e => setBankName(e.target.value)}
                            placeholder="Bank Name"
                            type="text"
                          /> */}
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label>Bank Account Number</Label>
                          {/* <Input
                            value={bankAccountNumber}
                            onChange={e => setBankAccountNumber(e.target.value)}
                            placeholder="Bank Account Number"
                            type="text"
                          /> */}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>Payment</Label>
                          {/* <Input
                            value={payment}
                            onChange={e => setPayment(e.target.value)}
                            placeholder="Payment"
                            type="text"
                          /> */}
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="7">
                        <FormGroup>
                          <Label>Address 1</Label>
                          <Input
                            value={address1}
                            onChange={e => setAddress1(e.target.value)}
                            placeholder="Address 1"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>Address 2</Label>
                          <Input
                            value={address2}
                            onChange={e => setAddress2(e.target.value)}
                            placeholder="Address 2 (optional)"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <Label>State</Label>
                          <Input
                            value={state}
                            onChange={e => setState(e.target.value)}
                            placeholder="State"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <Label>City</Label>
                          <Input
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <Label>Zip Code</Label>
                          <Input
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
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
                    submitShipmentData(); 
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
