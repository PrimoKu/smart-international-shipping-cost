import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "contexts/AuthContext.js";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label } from "reactstrap";
import SnakeGame from "components/SnakeGame";
import CouponListItem from "components/CouponListItem";

function Coupon() {
  const { user } = useAuth();

  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [modal, setModal] = useState(false); // State to control modal visibility
  const [snakeModal, setSnakeModal] = useState(false);
  const [addError, setAddError] = useState("");

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/userCoupons`, { withCredentials: true });
        setCoupons(response.data.coupons);
      } catch (error) {
        console.error("Error with fetching coupon");
      }
    }
    fetchCoupons();
  }, []);

  const toggleModal = () => setModal(!modal); // Function to toggle modal visibility
  const toggleSnakeModal = () => setSnakeModal(!snakeModal);

  const handleAddCoupon = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/userCoupons`, { coupon_code: couponCode }, { withCredentials: true })
      .then(response => {
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setAddError(error.response.data.message);
          console.log(error.response.data);
        }
    });
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
                <Button color="success" onClick={toggleSnakeModal}>Earn More Coupons</Button>
              </CardHeader>
              <CardBody>
                {/* Coupon Display */}
                {coupons?.length > 0 ? (
                  coupons.filter(coupon => coupon.used === false).map(coupon => <CouponListItem key={coupon.code} coupon={coupon}/>)
                ) : (
                  <p>No coupons available.</p>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Modal for Snake Game */}
      <Modal isOpen={snakeModal} toggle={toggleSnakeModal}>
        <SnakeGame
        color1="#248ec2"
        color2="#1d355e"
        backgroundColor="#ebebeb"
        setSnakeModal={setSnakeModal}
        />
        {/* </ModalBody> */}
      </Modal>

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
            <div className="text-danger" id="add_error">{addError}</div>
            </FormGroup>
          </ModalBody>
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
