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
  const { user } = useAuth();

  const [shipmentDetails, setShipmentDetails] = useState({
    // _id: '',
    firstName: user.shipment.first_name,
    lastName: user.shipment.last_name,
    address1: user.shipment.address_1,
    address2: user.shipment.address_2,
    state: user.shipment.state,
    city: user.shipment.city,
    zipCode: user.shipment.zip_code,
  });

  console.log(user)

  const updateShipment = async () => {
    let formData = new FormData();
    // formData.append('id', user.shipment._id);
    formData.append('firstName', shipmentDetails.firstName);
    formData.append('lastName', shipmentDetails.lastName);
    formData.append('address1', shipmentDetails.address1);
    formData.append('address2', shipmentDetails.address2);
    formData.append('state', shipmentDetails.state);
    formData.append('city', shipmentDetails.city);
    formData.append('zipCode', shipmentDetails.zipCode);

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

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            {/* User Information Card */}
            <Card>
              <CardHeader>
                <h2 className="title">Coupon System</h2>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
