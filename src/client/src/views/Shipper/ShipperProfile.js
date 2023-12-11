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

function ShipperProfile() {
  const [showUserEdit, setShowUserEdit] = useState(false);
  const [showPaymentEdit, setShowPaymentEdit] = useState(false);
  const [showShipmentEdit, setShowShipmentEdit] = useState(false);

  const { user } = useAuth();

  const USStates = {
    ALABAMA: 'AL',
    ALASKA: 'AK',
    ARIZONA: 'AZ',
    ARKANSAS: 'AR',
    CALIFORNIA: 'CA',
    COLORADO: 'CO',
    CONNECTICUT: 'CT',
    DELAWARE: 'DE',
    FLORIDA: 'FL',
    GEORGIA: 'GA',
    HAWAII: 'HI',
    IDAHO: 'ID',
    ILLINOIS: 'IL',
    INDIANA: 'IN',
    IOWA: 'IA',
    KANSAS: 'KS',
    KENTUCKY: 'KY',
    LOUISIANA: 'LA',
    MAINE: 'ME',
    MARYLAND: 'MD',
    MASSACHUSETTS: 'MA',
    MICHIGAN: 'MI',
    MINNESOTA: 'MN',
    MISSISSIPPI: 'MS',
    MISSOURI: 'MO',
    MONTANA: 'MT',
    NEBRASKA: 'NE',
    NEVADA: 'NV',
    NEW_HAMPSHIRE: 'NH',
    NEW_JERSEY: 'NJ',
    NEW_MEXICO: 'NM',
    NEW_YORK: 'NY',
    NORTH_CAROLINA: 'NC',
    NORTH_DAKOTA: 'ND',
    OHIO: 'OH',
    OKLAHOMA: 'OK',
    OREGON: 'OR',
    PENNSYLVANIA: 'PA',
    RHODE_ISLAND: 'RI',
    SOUTH_CAROLINA: 'SC',
    SOUTH_DAKOTA: 'SD',
    TENNESSEE: 'TN',
    TEXAS: 'TX',
    UTAH: 'UT',
    VERMONT: 'VT',
    VIRGINIA: 'VA',
    WASHINGTON: 'WA',
    WEST_VIRGINIA: 'WV',
    WISCONSIN: 'WI',
    WYOMING: 'WY'
};

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
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ShipperProfile;
