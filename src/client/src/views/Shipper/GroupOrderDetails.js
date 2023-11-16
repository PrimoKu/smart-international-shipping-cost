// src/client/src/views/Shipper/GroupOrderDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import { ScrollPanel } from 'primereact/scrollpanel';
import OrderListItem from '../../components/OrderListItem';

function GroupOrderDetails() {
    const { id } = useParams(); // This is the ID of the group order
    console.log('Group Order ID:', id);
    const [groupOrder, setGroupOrder] = useState([]);

    useEffect(() => {
        // Fetch the details of the group order when the component mounts
        console.log('Making API call to fetch group order');
        axios.get(`http://localhost:8080/api/groupOrders/${id}`, { withCredentials: true })
            .then(response => {
                console.log('Group Order Data:', response.data); // Check what data is returned from the API
                //setGroupOrder(response.data);
                setGroupOrder(response.data.GroupOrder);
            })
            .catch(error => {
                console.error('Error fetching group order details:', error); // Check if there's an error
            });
    }, [id]);
    
    console.log('Orders:', groupOrder?.orders);

    const acceptGroupOrder = () => {
        console.log(`Attempting to accept group order with id: ${id}`);
        axios.put(`http://localhost:8080/api/groupOrders/accept/${id}`, {status: 3}, { withCredentials: true })
            .then(response => {
                // Handle successful accept
                console.log('New status after accept:', response.data.status);
                //setGroupOrder({ ...groupOrder, status: response.data.status });
                window.location.reload();
            })
            .catch(error => {
            console.error('Error accepting group order:', error);
            console.error('Error details:', error.response?.data); // Additional logging to see the response from the server
        });
    };

    const completeGroupOrder = () => {
        console.log(`Attempting to complete group order with id: ${id}`);
        axios.put(`http://localhost:8080/api/groupOrders/complete/${id}`, {status: 4}, { withCredentials: true })
            .then(response => {
                // Handle successful complete
                console.log('New status after complete:', response.data.status);
                //setGroupOrder({ ...groupOrder, status: response.data.status });
                window.location.reload();
            })
            .catch(error => {
            console.error('Error completing group order:', error);
            console.error('Error details:', error.response?.data); // Additional logging to see the response from the server
        });
    };
    
    return (
    <div className="content">
        {groupOrder ? ( // Check if groupOrder is not null
            <Row>
                <Col xs="12">
                    <Card className="card-chart" color="primary">
                        <CardHeader>
                            <CardTitle tag="h2">{groupOrder.name} Details</CardTitle>
                        </CardHeader>
                        <CardBody style={{paddingTop: '5px', paddingBottom: '5px'}}>
                            <ScrollPanel style={{width: '100%', height: '500px'}}>
                                <DataTable value={groupOrder.orders} responsiveLayout="scroll">
                                    <Column field="name" header="Order Name" />
                                    <Column field="weight" header="Weight" />
                                    <Column field="price" header="Price" />
                                    {/* ... other columns as needed ... */}
                                </DataTable>
                            </ScrollPanel>
                            {groupOrder.status === 2 && (
                                <Button color="primary" onClick={acceptGroupOrder}>Accept</Button>
                            )}
                            {groupOrder.status === 3 && (
                                <Button color="secondary" onClick={completeGroupOrder}>Complete</Button>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        ) : (
            <p>Loading group order details...</p> // Show a loading message when data is not yet loaded
        )}
    </div>
);

    
}

export default GroupOrderDetails;

