import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

import { useAuth } from "contexts/AuthContext.js"; 
import CreateOrderModal from './CreateOrderModal';

import "primereact/resources/themes/lara-light-indigo/theme.css";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    FormGroup,
    Form,
    Input,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

function GroupOrder(props) {
    // const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    // Table of Orders in GroupOrder
    const [groupOrder, setGroupOrder] = useState("");
    const [pendingOrders, setPendingOrders] = useState([]);
    const [approvedOrders, setApprovedOrders] = useState([]);
    const [canceledOrders, setCanceledOrders] = useState([]);
    const [orderStatusList, setOrderStatusList] = useState([]);
    const [manager, setManager] = useState("");
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        weight: { value: null, matchMode: FilterMatchMode.CONTAINS },
        price: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        user: { value: null, matchMode: FilterMatchMode.IN }
    });
    const [loading, setLoading] = useState(true);

    var grouporderStatus;
    const [isCreateOrderModalOpen, setCreateOrderModalOpen] = useState(false);
    const [selectedGroupOrderId, setSelectedGroupOrderId] = useState();

    // Invite User Modal
    const [modal, setModal] = useState(false);
    const [modalCancelable, setModalCancelable] = useState(true);
    const [email, setEmail] = useState("");

    var groupOrderStatus;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/groupOrders/${id}`, { withCredentials: true })
                setGroupOrder(response.data.GroupOrder);
                setOrderStatusList(response.data.OrderStatusList);
                setManager(response.data.GroupOrder.manager);
                setUsers(response.data.GroupOrder.users);
                const pendingOrders = response.data.GroupOrder.orders.filter(order => order.status === 0);
                const approvedOrders = response.data.GroupOrder.orders.filter(order => order.status === 1);
                const canceledOrders = response.data.GroupOrder.orders.filter(order => order.status === 2);
                setPendingOrders(pendingOrders);
                setApprovedOrders(approvedOrders);
                setCanceledOrders(canceledOrders);
                setLoading(false);
                groupOrderStatus = response.data.GroupOrder.status;
                if (groupOrderStatus === 1) {
                    // if order completed
                    document.addEventListener('DOMContentLoaded', function() {
                        document.getElementById("inviteJoiner").remove();
                        document.getElementById("newOrder").remove();
                    });
                }
            } catch (error) {
                console.error("An error occurred while fetching data", error);
            }
        };
        fetchData();
    }, []);

    function setButtons(orderComplete) {
        if (orderComplete) {
            return (
                <h2 tag='h2' style={{width: "100%"}}> This order cannot be edited at this time.</h2>
            );
        } else {
            return (
                <Row sm='2' md='3' lg='4'>
                    <Col className='text-left' >
                        <Button color='info' size='lg' className='mr-3 mb-3' onClick={handleNavigation}>
                            Add New Order
                        </Button>
                    </Col>
                    {user?._id && manager?._id && user._id === manager._id && (
                    <Col className='text-left' >
                        <Button color='info' size='lg' className='mr-3 mb-3' onClick={toggleInviteModal}>
                            Invite Joiners
                        </Button>
                    </Col>
                    )}
                    <Col className='text-left' >
                      <Link to= {`/admin/checkout/${id}`}>
                          <Button color='info' size='lg' className='mr-3 mb-3' >
                              Checkout
                          </Button>
                      </Link>
                    </Col>  
                </Row>
            );
        }
    }

    const weightBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.weight}</span>
            </div>
        );
    };

    const priceBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.price}</span>
            </div>
        );
    };

    const userBodyTemplate = (rowData) => {
        const user = users.find(obj => obj._id === rowData.user_id);
        return (
            <div className="flex align-items-center gap-2">
                <span>{user.name}</span>
            </div>
        );
    };

    const getTextFromValue = (value) => {
        const status = orderStatusList.find(obj => obj.value === value);
        return status ? status.text : null;
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{getTextFromValue(rowData.status)}</span>
            </div>
        );
    };
    
    //todo edit?
    const managerBodyTemplate = (rowData) => {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <Button style={{ whiteSpace: 'nowrap', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                    color='success' data-orderid={rowData._id} onClick={approveOnClick}>Approve</Button>
                <Button style={{ whiteSpace: 'nowrap', padding: '10px 10px' }}  
                    color='danger' data-orderid={rowData._id} onClick={cancelOnClick}>Cancel</Button>
            </div>
        );
    };

    const pendingOrdersBody = (orderComplete) => {
        if (!orderComplete) {
            return (
            <Row>
                <Col xs='12'>
                    <Card className='card-chart'>
                    <CardHeader>
                        <Row>
                            <Col className='text-left' sm='6'>
                                <CardTitle tag='h2'>Requested</CardTitle>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <DataTable value={pendingOrders} paginator rows={10} dataKey="_id" filters={filters} filterDisplay="row" loading={loading}
                                globalFilterFields={['name', 'weight', 'price', 'user', 'status']}  emptyMessage="No orders found.">
                            <Column field="name" header="Order Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                            <Column header="Weight" filterField="weight" style={{ minWidth: '12rem' }} body={weightBodyTemplate} filter filterPlaceholder="Search by weight" />
                            <Column header="Price" filterField="price" style={{ minWidth: '12rem' }} body={priceBodyTemplate} filter filterPlaceholder="Search by price"/>
                            <Column header="Joiner" filterField="user" style={{ minWidth: '12rem' }} body={userBodyTemplate} filter filterPlaceholder="Search by joiner"/>
                            <Column header="Status" filterField="status" style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterPlaceholder="Search by status"/>
                            {user?._id && manager?._id && user._id === manager._id && (
                                <Column style={{ minWidth: '10rem' }} body={managerBodyTemplate}/>
                            )}
                        </DataTable>
                    </CardBody>
                    </Card>
                </Col>
            </Row>

            );
        }
    }

    const approveOnClick = (e) => {
        const orderId = e.target.dataset.orderid;

        let formData = new FormData();
        formData.append('status', orderStatusList[1].value);

        axios.put(`http://localhost:8080/api/orders/approve/${orderId}`, formData, { withCredentials: true })
        .then(res => {
            window.location.reload();
        })
        .catch((error) => {
            if (error.response && error.response.data) {
            }
        });
    }

    const cancelOnClick = (e) => {
        const orderId = e.target.dataset.orderid;

        let formData = new FormData();
        formData.append('status', orderStatusList[1].value);

        axios.put(`http://localhost:8080/api/orders/cancel/${orderId}`, formData, { withCredentials: true })
        .then(res => {
            window.location.reload();
        })
        .catch((error) => {
            if (error.response && error.response.data) {
            }
        });
    }


    const handleNavigation = () => {
        setSelectedGroupOrderId(groupOrder._id);
        setCreateOrderModalOpen(true);
    };

    const toggleInviteModal = () => {
        setModal(!modal);
        setModalCancelable(true);
    }

    const handleInvite = async (e) => {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append('userEmail', email);

        axios.post(`http://localhost:8080/api/groupOrders/invite/${groupOrder._id}`, formData, { withCredentials: true })
        .then(res => {
            window.location.reload();
        })
        .catch((error) => {
            if (error.response && error.response.data) {
            }
        });
    };

    return (
        // <PrimeReactProvider>
        <div className='content'>
            <Row sm='2' md='3' lg='4'>
                <Col className='text-left' >
                    <h5 className='card-category'>GroupOrder</h5>
                    <h1 tag='h1'>{groupOrder.name}</h1>
                </Col>
                <Col className='text-left' >
                    <h5 className='card-category'>Manager</h5>
                    <h1 tag='h1'>{manager.name}</h1>
                </Col>
                <Col className='text-left' >
                    <h5 className='card-category'>Ready</h5>
                    <h1 tag='h1'>Checkout</h1>
                </Col>
            </Row>
            
            {setButtons(groupOrderStatus)}
            {pendingOrdersBody(groupOrderStatus)}
            <Row>
                <Col xs='12'>
                    <Card className='card-chart'>
                    <CardHeader>
                        <Row>
                            <Col className='text-left' sm='6'>
                                <CardTitle tag='h2'>Accepted</CardTitle>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <DataTable value={approvedOrders} paginator rows={10} dataKey="_id" filters={filters} filterDisplay="row" loading={loading}
                                globalFilterFields={['name', 'weight', 'price', 'user', 'status']}  emptyMessage="No orders found.">
                            <Column field="name" header="Order Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                            <Column header="Weight" filterField="weight" style={{ minWidth: '8rem' }} body={weightBodyTemplate} filter filterPlaceholder="Search by weight" />
                            <Column header="Price" filterField="price" style={{ minWidth: '8rem' }} body={priceBodyTemplate} filter filterPlaceholder="Search by price"/>
                            <Column header="Joiner" filterField="user" style={{ minWidth: '12rem' }} body={userBodyTemplate} filter filterPlaceholder="Search by joiner"/>
                            <Column header="Status" filterField="status" style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterPlaceholder="Search by status"/>
                        </DataTable>
                    </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xs='12'>
                    <Card className='card-chart'>
                    <CardHeader>
                        <Row>
                            <Col className='text-left' sm='6'>
                                <CardTitle tag='h2'>Canceled</CardTitle>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <DataTable value={canceledOrders} paginator rows={10} dataKey="_id" filters={filters} filterDisplay="row" loading={loading}
                                globalFilterFields={['name', 'weight', 'price', 'user', 'status']}  emptyMessage="No orders found.">
                            <Column field="name" header="Order Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                            <Column header="Weight" filterField="weight" style={{ minWidth: '8rem' }} body={weightBodyTemplate} filter filterPlaceholder="Search by weight" />
                            <Column header="Price" filterField="price" style={{ minWidth: '8rem' }} body={priceBodyTemplate} filter filterPlaceholder="Search by price"/>
                            <Column header="Joiner" filterField="user" style={{ minWidth: '12rem' }} body={userBodyTemplate} filter filterPlaceholder="Search by joiner"/>
                            <Column header="Status" filterField="status" style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterPlaceholder="Search by status"/>
                        </DataTable>
                    </CardBody>
                    </Card>
                </Col>
            </Row>

            <CreateOrderModal isOpen={isCreateOrderModalOpen} toggle={() => setCreateOrderModalOpen(false)} groupOrderId={selectedGroupOrderId} />

            <Modal isOpen={modal} toggle={toggleInviteModal}>
                <ModalHeader toggle={toggleInviteModal}>
                    <div className="text-dark mb-0" style={{fontSize: '30px'}}>Invite Joiners</div>
                </ModalHeader>
                <Form id="form_invite" onSubmit={handleInvite}>
                    <ModalBody style={{height: '75px'}}>
                        <div className="text-dark">
                                <FormGroup>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        style={{ height: '50px', fontSize: '18px' }}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
                        <Button type="submit" className="btn-success mx-1">Invite</Button>
                        <Button className="btn-secondary mx-1" onClick={toggleInviteModal} style={modalCancelable ? {} : { display: 'none' }}>Close</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
        // </PrimeReactProvider>
    );
}

export default GroupOrder;