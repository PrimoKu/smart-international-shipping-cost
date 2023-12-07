import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "contexts/AuthContext.js";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label } from "reactstrap";

function Coupon() {
  const { user } = useAuth();

  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [modal, setModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    axios.get('/userCoupons')
      .then(response => {
        if (response.status === 200) {
          setCoupons(response.data.coupons);
        }
      })
      .catch(error => console.error("Error fetching coupons:", error));
  }, []);

  const toggleModal = () => setModal(!modal); // Function to toggle modal visibility

  const handleAddCoupon = (e) => {
    e.preventDefault();
    axios.post('/userCoupons', { coupon_code: couponCode })
      .then(response => {
        if (response.status === 200) {
          setCoupons([...coupons, response.data]);
          setCouponCode("");
          toggleModal(); // Close the modal after adding the coupon
        }
      })
      .catch(error => console.error("Error adding coupon:", error));
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h2 className="title">Your Coupons</h2>
                <Button color="primary" onClick={toggleModal}>Add Coupon</Button> {/* Button to open modal */}
              </CardHeader>
              <CardBody>
                {/* Coupon Display */}
                {coupons.length > 0 ? (
                  coupons.map(coupon => (
                    <div key={coupon._id}>
                      <p>Name: {coupon.name}</p>
                      <p>Code: {coupon.code}</p>
                      <p>Discount: {coupon.discount}</p>
                      <p>Expires on: {coupon.expire_date}</p>
                    </div>
                  ))
                ) : (
                  <p>No coupons available.</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Modal for Adding Coupon */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add a Coupon</ModalHeader>
        <Form onSubmit={handleAddCoupon}>
          <ModalBody>
            <FormGroup>
              <Label for="couponCode">Coupon Code</Label>
              <Input
                type="text"
                name="couponCode"
                id="couponCode"
                placeholder="Enter coupon code"
                style={{ height: '50px', fontSize: '18px', color: 'black' }}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </FormGroup>
          </ModalBody>
{/* 
          <ModalFooter style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
                  <Button color="secondary" onClick={toggleCreateGroupOrderModal} className="btn-secondary mx-1" style={createGroupOrderModalCancelable ? {} : { display: 'none' }}>Close</Button>
              </ModalFooter> */}

          <ModalFooter style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
            <Button color="primary" type="submit" className="btn-secondary mx-1">Add Coupon</Button>{' '}
            <Button color="secondary" onClick={toggleModal} className="btn-secondary mx-1">Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}

export default Coupon;
