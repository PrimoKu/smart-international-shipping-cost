import classNames from 'classnames';
import { Line, Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrderListItem from '../components/OrderListItem';
import '../assets/css/OrderItem.css';
import { useAuth } from "contexts/AuthContext.js";
import CreateOrderModal from './CreateOrderModal'; 

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardFooter,
} from 'reactstrap';

function Dashboard(props) {
  const [data, setData] = useState([]);
  const [managed, setManaged] = useState([]);
  const [joined, setJoined] = useState([]);
  const {user} = useAuth();
  const [isCreateOrderModalOpen, setCreateOrderModalOpen] = useState(false);

  const toggleCreateOrderModal = () => {
    setCreateOrderModalOpen(!isCreateOrderModalOpen);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/groupOrders/', { withCredentials: true });
        console.log(response.data);
        setManaged(response.data.managed);
        setJoined(response.data.joined);
      } catch (error) {
        console.error("An error occurred while fetching data", error);
      }
    };
    fetchData();
  }, []);

  function getManagerOrders(data) {
    var managed = data.filter(order => order.manager_id === user?._id);
    //if (managed.length >= 3) {
    //  managed = managed.slice(0, 3);
    //}
    return managed;
  }

  function getJoinerOrders(data) {
    var joined = data.filter(order => order.manager_id !== user?._id);
    //if (joined.length >= 3) {
    //  joined = joined.slice(0, 3);
    //}
    return joined;
  }

  function ordersEmpty(data, isManager) {
    if (data.length == 0 && isManager) {
      return (
      <Card className='card-chart' style={{minHeight: '300px'}}>
        <CardHeader>
          <h5 className='card-category' style={{fontSize: "x-large", color: "white", fontFamily:"'Lucida Console', monospace"}}>GO's You Manage</h5>
        </CardHeader>
        <CardBody>
          <h5 className='card-category' style={{fontSize: "large", color: "darkgrey", fontFamily:"'Lucida Console', monospace", marginLeft: "15px"}}>No orders here...</h5>
        </CardBody>
      </Card>);
    } else if (data.length == 0 && !isManager) {
      return (
        <Card className='card-chart' style={{minHeight: '300px', maxHeight:'300px', overflowY: 'scroll', overflow: 'auto'}}>
          <CardHeader>
            <h5 className='card-category' style={{fontSize: "x-large", color: "white", fontFamily:"'Lucida Console', monospace"}}>GO's You Joined</h5>
          </CardHeader>
          <CardBody>
            <h5 className='card-category' style={{fontSize: "large", color: "darkgrey", fontFamily:"'Lucida Console', monospace", marginLeft: "15px"}}>No orders here...</h5>
          </CardBody>
        </Card>);
    } else {
      if (isManager) {
        return (
        <Card className='card-chart' style={{minHeight: '300px', maxHeight:'300px', overflowY: 'scroll', overflow: 'auto'}}>
          <CardHeader>
            <h5 className='card-category' style={{fontSize: "x-large", color: "white", fontFamily:"'Lucida Console', monospace"}}>GO's You Manage</h5>
          </CardHeader>
          <CardBody>
            {data.map(order => (
               <OrderListItem key={order._id} ident={order._id} name={order.name} updatedAt={order.updatedAt} />
            ))}
          </CardBody>
        </Card>);
      } else {
        return (
        <Card className='card-chart' style={{minHeight: '300px'}}>
          <CardHeader>
            <h5 className='card-category' style={{fontSize: "x-large", color: "white", fontFamily:"'Lucida Console', monospace"}}>GO's You Joined</h5>
          </CardHeader>
          <CardBody>
            {data.map(order => (
               <OrderListItem key={order._id} ident={order._id} name={order.name} updatedAt={order.updatedAt} />
            ))}
          </CardBody>
          <CardFooter>
            <Link>
              See All
            </Link>
          </CardFooter>
        </Card>);
      }
    }
  }
  
  return (
    <>
      <div className='content'>
        <Row>
          <Col>
            <Button color='info' size='lg' className='mr-3 mb-3' style={{width: '30%'}} onClick={toggleCreateOrderModal}>
              Add New Group Order
            </Button>
            <CreateOrderModal isOpen={isCreateOrderModalOpen} toggle={toggleCreateOrderModal} />
          </Col>
        </Row>
        <Row>
          <Col xs='12'>
            <Row>
              <Col>
                {ordersEmpty(managed, true)}
              </Col>
              <Col>
                {ordersEmpty(joined, false)}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className='card-chart'>
            <CardHeader>
              <h5 className='card-category' style={{fontSize: "x-large", color: "white", fontFamily:"'Lucida Console', monospace"}}>Notifications</h5>
            </CardHeader>
            <CardBody>
              <h5 className='card-category' style={{fontSize: "large", color: "darkgrey", fontFamily:"'Lucida Console', monospace", marginLeft: "15px"}}>No notifications here...</h5>
            </CardBody>
          </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
