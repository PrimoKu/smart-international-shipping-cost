import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

import { useAuth } from "contexts/AuthContext.js"; 
// import CreateOrderModal from './CreateOrderModal';


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
    Label,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
//import ViewJoinersModal from './ViewJoinersModal';

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
        user: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [joinersFilters, setJoinersFilters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [loading, setLoading] = useState(true);


    // Invite User Modal
    const [inviteModal, setInviteModal] = useState(false);
    const [inviteModalCancelable, setInviteModalCancelable] = useState(true);
    const [joinersModal, setJoinersModal] = useState(false);
    const [joinersModalCancelable, setJoinersModalCancelable] = useState(true);

    const [createOrderModal, setCreateOrderModal] = useState(false);
    const [createOrderModalCancelable, setCreateOrderModalCancelable] = useState(true);
    const [email, setEmail] = useState("");

    var groupOrderStatus;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/groupOrders/${id}`, { withCredentials: true })
                console.log(response.data.GroupOrder);
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
                    document.addEventListener('DOMContentLoaded', function () {
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
                <CardHeader>
                <h2 tag='h2' style={{ width: "100%" }}> This order cannot be edited at this time.</h2>
                </CardHeader>
            
            );
        } else {
            return (
                <Row sm='2' md='3' lg='4'>
                    <Col className='text-left' >
                        <Button color='info' size='lg' className='mr-3 mb-3' onClick={toggleCreateOrderModal}>
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
                    {user?._id && manager?._id && user._id === manager._id && (
                    <Col className='text-left' >
                      <Link to= {`/admin/checkout/${id}`}>
                          <Button color='info' size='lg' className='mr-3 mb-3' >
                              Checkout
                          </Button>
                      </Link>
                    </Col>  
                    )}
                    {user?._id && manager?._id && user._id === manager._id && (
                    <Col className='text-left' >
                          <Button color='info' size='lg' className='mr-3 mb-3' onClick={toggleJoinersModal}>
                              Manage
                          </Button>
                    </Col>  
                    )}
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

    const joinersBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span>{rowData.name}</span>
            <Button style={{ whiteSpace: 'nowrap' }}  color='danger' onClick={() => removeJoiner(rowData._id)}>
                Remove
            </Button>
        </div>
        );
    };

    const getTextFromValue = (value) => {
        const status = orderStatusList.find(obj => obj.value === value);
        return status ? status.text : null;
    }

    const removeJoiner = async (joinerId) => {
        axios.delete(`http://localhost:8080/api/groupOrders/${id}/remove/${joinerId}`, { withCredentials: true })
        .then(response => {
            window.location.reload();
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                console.log(error.response);
            }
        });
    };
    

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

    const toggleInviteModal = () => {
        setInviteModal(!inviteModal);
        setInviteModalCancelable(true);
    }

    const toggleJoinersModal = () => {
        setJoinersModal(!joinersModal);
        setJoinersModalCancelable(true);
    }

    const toggleCreateOrderModal = () => {
        setCreateOrderModal(!createOrderModal);
        setCreateOrderModalCancelable(true);
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


    const location = useLocation();
    const groupOrderId = location.state?.groupOrder_id;
    const [order, setOrder] = useState({
      name: '',
      price: '',
      weight: '',
      groupOrder_id: '',
      date: '',
    });
    const [modal, setModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalCancelable, setModalCancelable] = useState(true);
    const navigate = useNavigate();
  
    const toggleModal = () => {
      if (modalCancelable) {
        setModal(!modal);
      }
    };
    const showModal = (title, content, cancelable = true) => {
      setModalTitle(title);
      setModalContent(content);
      setModalCancelable(cancelable);
      setModal(true);
    };
    const handleSubmit = async () => {
      let formData = new FormData();
      formData.append('name', order.name);
      formData.append('price', order.price);
      formData.append('weight', order.weight);
      formData.append('groupOrder_id', groupOrderId);
  
      axios.post('http://localhost:8080/api/orders', formData, { withCredentials: true })
      .then(response => {
          showModal("Order", "Create succeeded!", true);
      })
      .catch((error) => {
          if (error.response && error.response.data) {
              console.log(error.response);
          }
      });
    };

    const handleModalClosed = () => {
        window.location.assign(`/admin/groupOrder/${groupOrderId}`);
      }


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
                {user?._id && manager?._id && user._id === manager._id && (
                <Col className='text-left' >
                    <h5 className='card-category'>Ready</h5>
                    <h1 tag='h1'>Checkout</h1>
                </Col>
                )}
                {user?._id && manager?._id && user._id === manager._id && (
                <Col className='text-left' >
                    <h5 className='card-category'>Manage</h5>
                    <h1 tag='h1'>Joiners</h1>
                </Col>
                )}
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

            {/* <CreateOrderModal isOpen={isCreateOrderModalOpen} toggle={() => setCreateOrderModalOpen(false)} groupOrderId={selectedGroupOrderId} /> */}

            <Modal isOpen={inviteModal} toggle={toggleInviteModal}>
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
                                        style={{ height: '50px', fontSize: '18px', color: 'black' }}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormGroup>
                        </div>
                    </ModalBody>
                    <ModalFooter style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
                        <Button type="submit" className="btn-success mx-1">Invite</Button>
                        <Button className="btn-secondary mx-1" onClick={toggleInviteModal} style={inviteModalCancelable ? {} : { display: 'none' }}>Close</Button>
                    </ModalFooter>
                </Form>
            </Modal>

            <Modal isOpen={joinersModal} toggle={toggleJoinersModal}>
                <ModalHeader toggle={toggleJoinersModal}>
                    <div className="text-dark mb-0" style={{fontSize: '30px'}}>Joiners</div>
                </ModalHeader>
                <Form id="form_invite">
                    <ModalBody>
                        <DataTable value={users.filter(obj => obj._id !== manager._id)} paginator rows={5} dataKey="_id" filters={joinersFilters} filterDisplay="row" loading={loading} emptyMessage="No joiners found.">
                            <Column header="Joiner" filterField="name" style={{ minWidth: '12rem' }} body={joinersBodyTemplate} filter filterPlaceholder="Search by joiner"/>
                        </DataTable>
                    </ModalBody>
                    <ModalFooter style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
                        <Button className="btn-secondary mx-1" onClick={toggleJoinersModal} style={createOrderModalCancelable ? {} : { display: 'none' }}>Close</Button>
                    </ModalFooter>
                </Form>
            </Modal>

    <Modal isOpen={createOrderModal} toggle={toggleCreateOrderModal}>
    <ModalHeader toggle={toggleCreateOrderModal}>
        <div className="text-dark mb-0" style={{fontSize: '30px'}}>Create Order</div>
    </ModalHeader>
    <ModalBody>
        {/* <Card className='text-center'>
            <CardBody>
                <CardTitle tag='h3'>Fill Order Details</CardTitle> */}
                <Form>
                    <FormGroup>
                        <Label for='name'>Order Name</Label>
                        <Input
                            type='text'
                            id='name'
                            placeholder='Enter order name'
                            value={order.name}
                            onChange={(e) => setOrder({ ...order, name: e.target.value })}
                            style={{ height: '50px', fontSize: '18px', color: 'black' }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='price'>Price</Label>
                        <Input
                            type='number'
                            id='price'
                            placeholder='Enter price'
                            value={order.price}
                            onChange={(e) => setOrder({ ...order, price: e.target.value })}
                            style={{ height: '50px', fontSize: '18px', color: 'black' }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='weight'>Weight</Label>
                        <Input
                            type='number'
                            id='weight'
                            placeholder='Enter weight'
                            value={order.weight}
                            onChange={(e) => setOrder({ ...order, weight: e.target.value })}
                            style={{ height: '50px', fontSize: '18px', color: 'black' }}
                        />
                    </FormGroup>
                    <Button color='info' size='lg' block onClick={handleSubmit} className="btn-success mx-1">
                        Submit
                    </Button>
                </Form>
            {/* </CardBody>
        </Card> */}
    </ModalBody>
    <ModalFooter style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
        <Button className="btn-secondary mx-1" onClick={toggleCreateOrderModal} style={joinersModalCancelable ? {} : { display: 'none' }}>Close</Button>
    </ModalFooter>

    <Link to='/admin/dashboard'>
        <Button className="btn-success mx-1">Return to Home</Button>
    </Link>

</Modal>

<Modal isOpen={modal} toggle={toggleModal} keyboard={modalCancelable} onClosed={handleModalClosed}>
    <ModalHeader toggle={toggleModal}>
        <div className="text-dark mb-0" style={{fontSize: '30px'}}>{modalTitle}</div>
    </ModalHeader>
    <ModalBody>
        <p style={{fontSize: '20px'}}>{modalContent}</p>
    </ModalBody>
    <ModalFooter style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
        <Button color="secondary" onClick={toggleModal} className="btn-secondary mx-1" style={modalCancelable ? {} : { display: 'none' }}>Close</Button>
    </ModalFooter>
</Modal>



        </div>
        // </PrimeReactProvider>
    );
}

export default GroupOrder;