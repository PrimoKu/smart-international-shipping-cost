import classNames from 'classnames';
import { Line, Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrderListItem from '../../components/OrderListItem';
import '../../assets/css/OrderItem.css';
import { useAuth } from "contexts/AuthContext.js";

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
  const { user } = useAuth();
  
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

  function getJoinerOrders(data) {
    var joined = data.filter(order => order.shipper_id == user?._id);
    return joined;
  }

  function ordersEmpty(data, isManager) {
    if (data.length == 0 && isManager) {
      return (
        <Card className='card-chart' style={{ minHeight: '300px' }}>
          <CardHeader>
            <h5 className='card-category' style={{ fontSize: "x-large", color: "white", fontFamily: "'Lucida Console', monospace" }}>All Group Orders</h5>
          </CardHeader>
          <CardBody>
            <h5 className='card-category' style={{ fontSize: "large", color: "darkgrey", fontFamily: "'Lucida Console', monospace", marginLeft: "15px" }}>No orders here...</h5>
          </CardBody>
        </Card>);
    } else if (data.length == 0 && !isManager) {
      return (
        <Card className='card-chart' style={{ minHeight: '300px', maxHeight: '300px', overflowY: 'scroll', overflow: 'auto' }}>
          <CardHeader>
            <h5 className='card-category' style={{ fontSize: "x-large", color: "white", fontFamily: "'Lucida Console', monospace" }}>Group Orders Accepted</h5>
          </CardHeader>
          <CardBody>
            <h5 className='card-category' style={{ fontSize: "large", color: "darkgrey", fontFamily: "'Lucida Console', monospace", marginLeft: "15px" }}>No orders here...</h5>
          </CardBody>
        </Card>);
    } else {
      if (isManager) {
        return (
          <Card className='card-chart' style={{ minHeight: '300px', maxHeight: '300px', overflowY: 'scroll', overflow: 'auto' }}>
            <CardHeader>
              <h5 className='card-category' style={{ fontSize: "x-large", color: "white", fontFamily: "'Lucida Console', monospace" }}>All Group Orders</h5>
            </CardHeader>
            <CardBody>
              {data.map(order => (
                <OrderListItem key={order._id} ident={order._id} name={order.name} updatedAt={order.updatedAt} />
              ))}
            </CardBody>
          </Card>);
      } else {
        return (
          <Card className='card-chart' style={{ minHeight: '300px' }}>
            <CardHeader>
              <h5 className='card-category' style={{ fontSize: "x-large", color: "white", fontFamily: "'Lucida Console', monospace" }}>Group Orders Accepted</h5>
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
        
      </div>
    </>
  );
}

export default Dashboard;