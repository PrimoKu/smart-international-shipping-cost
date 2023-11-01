import classNames from 'classnames';
import { Line, Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrderListItem from '../components/OrderListItem';
import ConfirmationListItem from '../components/ConfirmationListItem';
import '../assets/css/OrderItem.css';
import { useAuth } from "contexts/AuthContext.js";
import CreateOrderModal from './CreateOrderModal'; 
import { Paginator } from 'primereact/paginator';


import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardFooter,
} from 'reactstrap';
import { ScrollPanel } from 'primereact/scrollpanel';

function Dashboard(props) {
  const [data, setData] = useState([]);
  const [managed, setManaged] = useState([]);
  const [joined, setJoined] = useState([]);
  const {user} = useAuth();
  const [isCreateOrderModalOpen, setCreateOrderModalOpen] = useState(false);

  const toggleCreateOrderModal = () => {
    setCreateOrderModalOpen(!isCreateOrderModalOpen);
  }

  const [firstManage, setFirstManage] = useState(0);

  const onPageChange = (event) => {
      setFirstManage(event.first);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/groupOrders/', { withCredentials: true });
        setData((response.data.managed).concat((response.data.joined)));
        setManaged(response.data.managed);
        setJoined(response.data.joined);
      } catch (error) {
        console.error("An error occurred while fetching data", error);
      }
    };
    fetchData();
  }, []);

  function ordersEmpty(data, isManager) {
    if (data.length == 0 && isManager) {
      return (
      <Card className='card-chart' style={{minHeight: '300px', maxHeight: '500px'}}>
        <CardHeader>
          <h5 className='title' style={{fontSize: "x-large", color: "white"}}>GO's You Manage</h5>
        </CardHeader>
        <CardBody>
          <h5 className='title' style={{fontSize: "large", color: "darkgrey"}}>No orders here...</h5>
        </CardBody>
      </Card>);
    } else if (data.length == 0 && !isManager) {
      return (
        <Card className='card-chart' style={{minHeight: '300px', maxHeight:'300px'}}>
          <CardHeader>
            <h5 className='title' style={{fontSize: "x-large", color: "white"}}>GO's You Joined</h5>
          </CardHeader>
          <CardBody>
            <h5 className='title' style={{fontSize: "large", color: "darkgrey", marginLeft: "15px"}}>No orders here...</h5>
          </CardBody>
        </Card>);
    } else {
      if (isManager) {
        return (
        <Card className='card-chart' style={{minHeight: '300px', maxHeight:'300px'}}>
          <CardHeader>
            <h5 className='title' style={{marginBottom: '0px', height: '40px', fontSize: "x-large", color: "white"}}>GO's You Manage</h5>
          </CardHeader>
          <ScrollPanel style={{width: '100%', height: '250px'}}> 
            <CardBody style={{paddingTop: '5px', paddingBottom: '5px'}}>
              {//todo add filter here for active orders only + deadline check
              data.map(order => (
                <OrderListItem key={order._id} ident={order._id} name={order.name} deadline={order.deadline}/>
              ))}
            </CardBody>
           </ScrollPanel>
        </Card>);
      } else {
        return (
          <Card className='card-chart' style={{minHeight: '300px', maxHeight:'300px'}}>
            <CardHeader>
              <h5 className='title' style={{marginBottom: '0px', height: '40px', fontSize: "x-large", color: "white"}}>GO's You Joined</h5>
            </CardHeader>
            <ScrollPanel style={{width: '100%', height: '250px'}}> 
              <CardBody style={{paddingTop: '5px', paddingBottom: '5px'}}>
                {//todo add filter here for active orders only + deadline check
                data.map(order => (
                  <OrderListItem key={order._id} ident={order._id} name={order.name} deadline={order.deadline}/>
                ))}
              </CardBody>
             </ScrollPanel>
          </Card>);
      }
    }
  }

  function convertTime(time) {
    var date = new Date(time).toLocaleDateString();
    return date;
  }

  function completedOrders(data) {
    var activeOrders = data;//.filter(order => order.status === );
    if (activeOrders.length != 0) {
      return (
        <Card className='card-chart' style={{minHeight: '400px', maxHeight:'400px'}}>
          <CardHeader>
            <h5 className='title' style={{marginBottom: '0px', height: '40px', fontSize: "x-large", color: "white"}}>Submitted Orders</h5>
          </CardHeader>
          <ScrollPanel style={{width: '100%', height: '350px'}}> 
            <CardBody style={{paddingTop: '5px', paddingBottom: '5px'}}>
              {activeOrders.map(order => (
                <ConfirmationListItem key={order._id} ident={order._id} name={order.name} lastUpdatedAt={order.updatedAt} status={1}/>
              ))}
            </CardBody>
          </ScrollPanel>
        </Card>
      );
    }
    return (
      <Card className='card-chart'>
        <CardHeader>
          <h5 className='title' style={{marginBottom: '0px', height: '40px', fontSize: "x-large", color: "white"}}>Submitted Orders</h5>
        </CardHeader>
        <CardBody>
          <h5 className='title' style={{fontSize: "large", color: "darkgrey", marginLeft: "15px"}}>No orders here...</h5>
        </CardBody>
      </Card>
    );
  }
  
  return (
    <>
      <div className='content'>
        <Row>
          <Col>
            <h5 className='title' style={{display: "flex", alignItems: "center", justifyContent: "center", float: "left", height: '40px', color: "white", fontSize: "x-large"}}>Active/Completed Group Orders</h5>
          </Col>
          <Col>
            <Link to='/creategroup'>
              <Button color='info' size='lg' className='mr-3 mb-3' style={{width: '75%', float:"right", marginRight: '0px'}}>
                Add New Group Order
              </Button>
            </Link>
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
            {completedOrders(data)}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
