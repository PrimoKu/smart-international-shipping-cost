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
  UncontrolledDropdown,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  ButtonGroup
} from "reactstrap";

function Checkout() {

  const { id } = useParams();
  const { user } = useAuth();
  const [groupOrder, setGroupOrder] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [joiners, setJoiners] = useState([]);
  const [joinerFilter, setJoinerFilter] = useState("");

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

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const onDropdownClick = (e) => {
    setFilteredOrders(e.target.value ? orders.filter(order => order.user_id == e.target.value) : orders);
  }

  return (
    <>
      <div className="content">
        <Row sm='2' md='3' lg='4'>
          <Col className='text-left'>
            <CardTitle tag="h1">Checkout</CardTitle>
          </Col>
          <Col className='text-left' >
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>View Orders By Individual</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={onDropdownClick} value={""}>All Joiners</DropdownItem>
                <DropdownItem divider />
                {joiners.map(joiner => <DropdownItem key={joiner._id} onClick={onDropdownClick} value={joiner._id}>{joiner.name}</DropdownItem>)}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h2">{groupOrder ? "GO Name: " + groupOrder.name : "Group Order"}</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Item</th>
                      <th>Item Weight</th>
                      <th className="text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(order => (
                      <tr key={order._id}>
                        <td>{joiners.map(joiner => { if(joiner._id == order.user_id) {
                          return joiner.name
                        }})}</td>
                        <td>{order.name}</td>
                        <td>{order.weight}</td>
                        <td className="text-center">{order.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row sm='2' md='3' lg='4'>
          <Col className='text-left'>
          <Link to='/admin/dashboard'>
            <Button>Return to Home</Button>
          </Link>
          </Col>
          <Col className='text-center'>
            <Card>
              <CardHeader>
                <CardTitle tag="h2">Total: ${filteredOrders.reduce((acc, order) => acc + order.price, 0).toFixed(2)}</CardTitle>
              </CardHeader>
            </Card>
          </Col>
          <Col className='text-right'>
          <Button color="info">Submit Order</Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Checkout;
