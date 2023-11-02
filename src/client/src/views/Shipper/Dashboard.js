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

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [showAccepted, setShowAccepted] = useState(true);
  const [showNotAccepted, setShowNotAccepted] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/orders", { withCredentials: true });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const acceptedOrders = orders.filter(order => order.status === "Accepted");
  const notAcceptedOrders = orders.filter(order => order.status !== "Accepted");

  const showAll = () => {
    setShowAccepted(true);
    setShowNotAccepted(true);
  };

  const showAcceptedHandler = () => {
    setShowAccepted(true);
    setShowNotAccepted(false);
  };

  const showNotAcceptedHandler = () => {
    setShowAccepted(false);
    setShowNotAccepted(true);
  };

  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <Button color="primary" onClick={showAll}>All</Button>
          <Button color="primary" onClick={showAcceptedHandler}>Accept</Button>
          <Button color="primary" onClick={showNotAcceptedHandler}>Not Accepted</Button>
        </Col>
      </Row>
      {showAccepted && (
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">Accepted</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <DataTable value={acceptedOrders} paginator rows={10} dataKey="_id" loading={loading} style={{ width: '100%' }}>
                  {/* ... columns */}
                </DataTable>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
      {showNotAccepted && (
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">Not Accepted</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <DataTable value={notAcceptedOrders} paginator rows={10} dataKey="_id" loading={loading} style={{ width: '100%' }}>
                  {/* ... columns */}
                </DataTable>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;
