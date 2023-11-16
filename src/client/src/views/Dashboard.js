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
import { ToggleButton } from 'primereact/togglebutton';
import CreateGroupModal from './CreateGroupModal';

function Dashboard(props) {
  const [data, setData] = useState([]);
  const [managed, setManaged] = useState([]);
  const [joined, setJoined] = useState([]);
  const [submitted, setSubmitted] = useState([]);
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
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/groupOrders/`, { withCredentials: true });
        console.log(response);
        const fetchedData = (response.data.managed).concat((response.data.joined));
        setData(fetchedData);
        var sortedManaged = response.data.managed;
        sortedManaged = [...sortedManaged].sort((a,b) => {
          return new Date(a.deadline) - new Date(b.deadline);
        });
        sortedManaged = sortedManaged.filter(order => order.status === 0)
        setManaged(sortedManaged);
        var sortedJoined = response.data.joined;
        sortedJoined = sortedJoined.filter(order => order.status === 0)
        sortedJoined = [...sortedJoined].sort(function(a,b) {
          return new Date(a.deadline) - new Date(b.deadline);
        });
        setJoined(sortedJoined);

        setSubmitted(fetchedData.filter(order => order.status !== 0))
        console.log("HERE")
        console.log(submitted);

      } catch (error) {
        console.error("An error occurred while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const countryCodes = {
    "United States": "US",
    "China": "CN",
    "Japan": "JP",
    "Canada": "CA",
    "United Kingdom": "GB",
    "Australia": "AU", 
    "South Korea": "KR", 
    "France": "FR",
    "Italy": "IT",
    "Russia": "RU",
  };

  function getCountryCode(country) {
    console.log(country);
    if (countryCodes[country] === undefined || countryCodes[country] === null) {
      return "";
    } else {
      console.log("HERE")
      return countryCodes[country];
    }
  }

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
        <Card className='card-chart' style={{ minHeight: '300px', maxHeight: '300px', overflowY: 'scroll', overflow: 'auto' }}>
          <CardHeader>
            <h5 className='card-category' style={{ fontSize: "x-large", color: "white", fontFamily: "'Lucida Console', monospace" }}>GO's You Joined</h5>
          </CardHeader>
          <CardBody>
            <h5 className='card-category' style={{ fontSize: "large", color: "darkgrey", fontFamily: "'Lucida Console', monospace", marginLeft: "15px" }}>No orders here...</h5>
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
              {
              managed.map(order => (
                <OrderListItem key={order._id} ident={order._id} name={order.name} deadline={order.deadline} countryCode={getCountryCode(order.country)}/>
              ))}
            </CardBody>
            </ScrollPanel>
          </Card>);
      } else {
        return (
          <Card className='card-chart' style={{ minHeight: '300px' }}>
            <CardHeader>
              <h5 className='card-category' style={{ fontSize: "x-large", color: "white", fontFamily: "'Lucida Console', monospace" }}>GO's You Joined</h5>
            </CardHeader>
            <ScrollPanel style={{width: '100%', height: '250px'}}> 
              <CardBody style={{paddingTop: '5px', paddingBottom: '5px'}}>
                {
                joined.map(order => (
                  <OrderListItem key={order._id} ident={order._id} name={order.name} deadline={order.deadline} countryCode={getCountryCode(order.country)}/>
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

  function completedOrders() {
    if (submitted != 0) {
      return (
        <Card className='card-chart' style={{minHeight: '400px', maxHeight:'400px'}}>
          <CardHeader>
            <h5 className='title' style={{marginBottom: '0px', height: '40px', fontSize: "x-large", color: "white"}}>Submitted Orders</h5>
          </CardHeader>
          <ScrollPanel style={{width: '100%', height: '350px'}}> 
            <CardBody style={{paddingTop: '5px', paddingBottom: '5px'}}>
              {submitted.map(order => (
                <ConfirmationListItem key={order._id} ident={order._id} name={order.name} lastUpdatedAt={order.updatedAt} status={order.status} countryCode={getCountryCode(order.country)}/>
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
            <Button color='info' size='lg' className='mr-3 mb-3' style={{ width: '30%' }} onClick={toggleCreateOrderModal}>
              Add New Group Order
            </Button>
            <CreateGroupModal isOpen={isCreateOrderModalOpen} toggle={toggleCreateOrderModal} />
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
            {completedOrders()}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;