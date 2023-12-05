import classNames from 'classnames';
import { Line, Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrderListItem from '../../components/OrderListItem';
import '../../assets/css/OrderItem.css';
import { useAuth } from "contexts/AuthContext.js";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import ConfirmationListItem from '../../components/ConfirmationListItem';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useNavigate, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [showAccepted, setShowAccepted] = useState(true);
  const [showNotAccepted, setShowNotAccepted] = useState(true);
  const navigate = useNavigate();

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

  const countryCodesReverse = {
    "US": "United States",
    "CN": "China",
    "JP": "Japan",
    "CA": "Canada",
    "GB": "United Kingdom",
    "AU": "Australia", 
    "KR": "South Korea", 
    "FR": "France",
    "IT": "Italy",
    "RU": "Russia",
  };

  function getCountryCode(country) {
    if ((countryCodes[country] === undefined || countryCodes[country] === null) && (countryCodesReverse[country] === undefined || countryCodesReverse[country] === null)) {
      return "";
    } else if (countryCodes[country] !== undefined && (countryCodes[country] !== null)) {
      return countryCodes[country];
    } else {
      return country;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/groupOrders`, { withCredentials: true });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const acceptedOrders = orders.filter(order => order.status === 3);
  const notAcceptedOrders = orders.filter(order => order.status === 4);

  const showAllHandler = () => {
    setShowAll(true);
    setShowAccepted(false);
    setShowNotAccepted(false);
  };

  const showAcceptedHandler = () => {
    setShowAll(false);
    setShowAccepted(true);
    setShowNotAccepted(false);
  };

  const showNotAcceptedHandler = () => {
    setShowAll(false);
    setShowAccepted(false);
    setShowNotAccepted(true);
  };

  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <Button color="primary" onClick={showAllHandler}>All Orders</Button>
          
          <Button color="primary" onClick={showAcceptedHandler} >In Progress</Button>

          <Button color="primary" onClick={showNotAcceptedHandler} >Completed</Button>
        </Col>
      </Row>
      {showAll && (
        <Row>
          <Col xs="12">
            <Card className="card-chart" color="primary" >
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">All Orders</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <ScrollPanel style={{width: '100%', height: '500px'}}>
              <CardBody  style={{paddingTop: '5px', paddingBottom: '5px'}}>
                {orders.map(order => (
                  <OrderListItem key={order._id} ident={order._id} name={order.name} deadline={order.deadline} countryCode={getCountryCode(order.country)}/>
                ))}
              </CardBody>
              </ScrollPanel>
            </Card>
          </Col>
        </Row>
      )}

      {showAccepted && (
        <Row>
          <Col xs="12">
            <Card className="card-chart" color="primary">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">In Progress</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <ScrollPanel style={{width: '100%', height: '500px'}}>
              <CardBody  style={{paddingTop: '5px', paddingBottom: '5px'}}>
                
          
                  {
                acceptedOrders.map(order => (
                  <OrderListItem key={order._id} ident={order._id} name={order.name} deadline={order.deadline} />
                ))}
                
              </CardBody>
              </ScrollPanel>
            </Card>
          </Col>
        </Row>
      )}

      {showNotAccepted && (
        <Row>
          <Col xs="12">
            <Card className="card-chart" color="primary">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">Completed</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <ScrollPanel style={{width: '100%', height: '500px'}}>
              <CardBody  style={{paddingTop: '5px', paddingBottom: '5px'}}>
                
                  {
                notAcceptedOrders.map(order => (
                  <OrderListItem key={order._id} ident={order._id} name={order.name} deadline={order.deadline}/>
                ))}
                
              </CardBody>
              </ScrollPanel>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;