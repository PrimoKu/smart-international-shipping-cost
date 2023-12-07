import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ConfirmationPopup from '../components/ConfirmationPopup';
import { useAuth } from "contexts/AuthContext.js";
import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
} from "reactstrap";
import CouponListItem from 'components/CouponListItem';
import { ScrollPanel } from 'primereact/scrollpanel';

function Checkout() {

  const { id } = useParams();
  const { user } = useAuth();
  const [groupOrder, setGroupOrder] = useState("");
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [joiners, setJoiners] = useState([]);
  const [joinerFilter, setJoinerFilter] = useState("");
  const [couponModal, setCouponModal] = useState(false);
  const [couponModalCancelable, setCouponModalCancelable] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/groupOrders/${id}`, { withCredentials: true });
        setGroupOrder(response.data.GroupOrder);
        setOrders(response.data.GroupOrder.orders.filter(order => order.status === 1)); //approved orders
        setFilteredOrders(response.data.GroupOrder.orders.filter(order => order.status === 1));
        setJoiners(response.data.GroupOrder.users);
      } catch (error) {
        console.error("An error occurred while fetching data", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/coupons`, { withCredentials: true });
        setCoupons(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error with fetching coupon");
      }
    }
    fetchCoupons();
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const onDropdownClick = (e) => {
    setFilteredOrders(e.target.value ? orders.filter(order => order.user_id == e.target.value) : orders);
  }

  const handleSubmit = async () => {
    groupOrder.status = 2;
    axios.put(`http://localhost:8080/api/groupOrders/${id}`, groupOrder, { withCredentials: true });

  };
  const basePrice = filteredOrders.reduce((acc, order) => acc + order.price, 0);
  const totalShipping = filteredOrders.reduce((acc, order) => acc + (order.price + order.weight), 0);

  // opens the modal to add an order item
  const toggleCouponModal = () => {
    setCouponModal(!couponModal);
    setCouponModalCancelable(true);
  }

  return (
    <>
      <div className="content">
      <CardTitle tag="h1">Checkout</CardTitle>
        <Row sm='1' md='2'>
          <Col className='text-left'>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>View Orders By Individual</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={onDropdownClick} value={""}>All Joiners</DropdownItem>
                <DropdownItem divider />
                {joiners.map(joiner => <DropdownItem key={joiner._id} onClick={onDropdownClick} value={joiner._id}>{joiner.name}</DropdownItem>)}
                <DropdownItem key={user._id} onClick={onDropdownClick} value={user._id}>{user.name}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col className='text-right'>
            <Button color='info' size='lg' className='mr-3 mb-3' onClick={toggleCouponModal} disabled={orders.length === 0 || coupons.length == 0}>
              Apply Coupon
            </Button>
            <Modal isOpen={couponModal} toggle={toggleCouponModal}>
              <ModalHeader toggle={toggleCouponModal}>
                <div className="text-dark mb-0" style={{ fontSize: '30px' }}>Apply Coupon</div>
              </ModalHeader>
              <ModalBody>
                <Card className='card-chart' style={{ minHeight: '300px', maxHeight: '500px' }}>
                  <CardHeader>
                    <h5 className='title' style={{ fontSize: "x-large", color: "white" }}>Your Coupons</h5>
                  </CardHeader>
                  <ScrollPanel  style={{width: '100%', height: '250px'}}>
                  <CardBody style={{paddingTop: '5px', paddingBottom: '5px'}}>
                    {coupons.map(coupon => <CouponListItem key={coupon.code} coupon={coupon}/>)}
                  </CardBody>
                  </ScrollPanel>
                </Card>
                <Link to='/admin/dashboard'>
                  <Button className="btn-success mx-1">Return to Home</Button>
                </Link>
                <Button className="btn-secondary mx-1" onClick={toggleCouponModal} style={couponModalCancelable ? { float: 'right' } : { display: 'none' }}>Close</Button>
              </ModalBody>
              <ModalFooter style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }} />
            </Modal>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h2">{groupOrder ? "GO Name: " + groupOrder.name : "Group Order"}</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive striped>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Item</th>
                      <th>Item Weight</th>
                      <th className="text-center">Base Price</th>
                      <th className="text-center">Shipping Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order._id}>
                        <td>{user._id == order.user_id ? user.name : joiners.map(joiner => {
                          if (joiner._id == order.user_id) {
                            return joiner.name
                          }
                        })}</td>
                        <td>{order.name}</td>
                        <td>{order.weight} lbs</td>
                        <td className="text-center">${order.price}.00</td>
                        <td className="text-center">${order.price + order.weight}.00</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row xs='1' sm='2' lg='4'>
  <Col className='text-left'>
    <Link to='/admin/dashboard'>
      <Button>Return to Home</Button>
    </Link>
  </Col>
  <Col className='text-center'>
    <Card>
      <CardHeader>
        <CardTitle tag="h2">Total Base Price: ${basePrice.toFixed(2)}</CardTitle>
      </CardHeader>
    </Card>
  </Col>
  <Col className='text-center'>
    <Card>
      <CardHeader>
        <CardTitle tag="h2">Total Shipping: ${totalShipping.toFixed(2)}</CardTitle>
      </CardHeader>
    </Card>
  </Col>
  <Col className='text-right'>
    <Link to='/admin/dashboard'>
      <Button onClick={handleSubmit} disabled={groupOrder.status > 0}>Submit Order</Button>
    </Link>
  </Col>
</Row>

        <Row>
          <Col className='text-center'>
            <Card>
              <CardHeader>
                <CardTitle tag="h2" style={{color: '#41dc83'}}>Total Price: ${(basePrice + totalShipping).toFixed(2)}</CardTitle>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Checkout;
