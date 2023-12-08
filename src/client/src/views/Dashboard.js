import classNames from 'classnames';
import { Line, Bar } from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import OrderListItem from '../components/OrderListItem';
import ConfirmationListItem from '../components/ConfirmationListItem';
import '../assets/css/OrderItem.css';
import { useAuth } from "contexts/AuthContext.js";
import { Paginator } from 'primereact/paginator';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  CardFooter,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { ScrollPanel } from 'primereact/scrollpanel';

function Dashboard(props) {
  const [data, setData] = useState([]);
  const [managed, setManaged] = useState([]);
  const [joined, setJoined] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const {user} = useAuth();

  const [isCreateOrderModalOpen, setCreateOrderModalOpen] = useState(false);

  const [createGroupOrderModal, setCreateGroupOrderModal] = useState(false);
  const [createGroupOrderModalCancelable, setCreateGroupOrderModalCancelable] = useState(true);

  const toggleCreateOrderModal = () => {
    setCreateOrderModalOpen(!isCreateOrderModalOpen);
  }

  const toggleCreateGroupOrderModal = () => {
    setCreateGroupOrderModal(!createGroupOrderModal);
    setCreateGroupOrderModalCancelable(true);
}

  const [firstManage, setFirstManage] = useState(0);

  const onPageChange = (event) => {
      setFirstManage(event.first);
  };


  const [group, setGroup] = useState({
    name: '',
    country: 'US',
    deadline: '',
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
    formData.append('name', group.name);
    formData.append('country', group.country);
    formData.append('deadline', group.deadline);


    axios.post('http://localhost:8080/api/groupOrders/', formData, { withCredentials: true })
      .then(response => {
        showModal("Group", "Create succeeded!", true);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response);
        }
      });
  };


  const handleModalClosed = () => {
    window.location.assign('/admin/dashboard');
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/groupOrders/`, { withCredentials: true });
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

  function ordersEmpty(data, isManager) {
    if (data.length == 0 && isManager) {
      return (
      <Card className='card-chart' style={{minHeight: '300px', maxHeight: '500px'}}>
        <CardHeader>
          <h5 className='card-category' style={{fontSize: "x-large", color: "white"}}>GO's You Manage</h5>
        </CardHeader>
        <CardBody>
          <h5 className='card-category' style={{fontSize: "large", color: "darkgrey", marginLeft: "15px"}}>No orders here...</h5>
        </CardBody>
      </Card>);
    } else if (data.length == 0 && !isManager) {
      return (
        <Card className='card-chart' style={{ minHeight: '300px', maxHeight: '300px', overflowY: 'scroll', overflow: 'auto' }}>
          <CardHeader>
            <h5 className='card-category' style={{ fontSize: "x-large", color: "white" }}>GO's You Joined</h5>
          </CardHeader>
          <CardBody>
            <h5 className='card-category' style={{ fontSize: "large", color: "darkgrey", marginLeft: "15px" }}>No orders here...</h5>
          </CardBody>
        </Card>);
    } else {
      if (isManager) {
        return (
        <Card className='card-chart' style={{minHeight: '300px', maxHeight:'300px'}}>
          <CardHeader>
            <h5 className='card-category' style={{marginBottom: '0px', height: '40px', fontSize: "x-large", color: "white"}}>GO's You Manage</h5>
          </CardHeader>
          <ScrollPanel style={{width: '100%', height: '250px'}}> 
            <CardBody style={{paddingTop: '5px', paddingBottom: '5px'}}>
              {console.log(managed)}
              {managed.map(order => (
                <OrderListItem key={order._id} ident={order._id} name={order.name} deadline={order.deadline} countryCode={getCountryCode(order.country)}/>
              ))}
            </CardBody>
            </ScrollPanel>
          </Card>);
      } else {
        return (
          <Card className='card-chart' style={{ minHeight: '300px' }}>
            <CardHeader>
              <h5 className='card-category' style={{ fontSize: "x-large", color: "white"}}>GO's You Joined</h5>
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
            <h5 className='card-category' style={{marginBottom: '0px', height: '40px', fontSize: "x-large", color: "white"}}>Submitted Orders</h5>
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
          <h5 className='card-category' style={{marginBottom: '0px', height: '40px', fontSize: "x-large", color: "white"}}>Submitted Orders</h5>
        </CardHeader>
        <CardBody>
          <h5 className='card-category' style={{fontSize: "large", color: "darkgrey", marginLeft: "15px"}}>No orders here...</h5>
        </CardBody>
      </Card>
    );
  }
  
  return (
    <>
      <div className='content'>
        <Row>
          <Col>
            <Button color='info' size='lg' className='mr-3 mb-3' style={{ width: '30%' }} onClick={toggleCreateGroupOrderModal}>
              Add New Group Order
            </Button>
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

        <Modal isOpen={createGroupOrderModal} toggle={toggleCreateGroupOrderModal}>
              <ModalHeader toggle={toggleCreateGroupOrderModal}>
                  <div className="text-dark mb-0" style={{fontSize: '30px'}}>Create Group</div>
              </ModalHeader>
              <ModalBody>
                  {/* <Card className='text-center'>
                      <CardBody> */}
                          <CardTitle tag='h3'>Fill Group Details</CardTitle>
                          <Form>
                              <FormGroup>
                                  <Label for='name'>Group Name</Label>
                                  <Input
                                      type='text'
                                      id='name'
                                      placeholder='Enter group name'
                                      value={group.name}
                                      onChange={(e) => setGroup({ ...group, name: e.target.value })}
                                      style={{ height: '50px', fontSize: '18px', color: 'black' }}
                                  />
                              </FormGroup>
                              <FormGroup>
                                  <Label for='country'>Country</Label>
                                  <Input
                                      type='select'
                                      id='country'
                                      value={group.country}
                                      onChange={(e) => setGroup({ ...group, country: e.target.value })}
                                      style={{ height: '50px', fontSize: '18px', color: 'black' }}
                                  >
                                      {Object.entries(countryCodes).map(([country, code]) => (
                                          <option key={code} value={code}>{country}</option>
                                      ))}
                                  </Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label for='name'>Deadline</Label>
                                  <Input
                                      type='date'
                                      id='deadline'
                                      placeholder='Enter deadline'
                                      value={group.deadline}
                                      onChange={(e) => setGroup({ ...group, deadline: e.target.value })}
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
                  <Button color="secondary" onClick={toggleCreateGroupOrderModal} className="btn-secondary mx-1" style={createGroupOrderModalCancelable ? {} : { display: 'none' }}>Close</Button>
              </ModalFooter>
          </Modal>

          <Modal isOpen={modal} toggle={toggleModal} keyboard={modalCancelable} onClosed={handleModalClosed}>
              <ModalHeader toggle={toggleModal}>
                  <div className="text-dark mb-0" style={{fontSize: '30px'}}>{modalTitle}</div>
              </ModalHeader>
              <ModalBody style={{height: '75px'}}>
                  <p style={{fontSize: '20px'}}>{modalContent}</p>
              </ModalBody>
              <ModalFooter style={{display: 'flex', justifyContent: 'flex-end', padding: '1rem'}}>
                  <Button color="secondary" onClick={toggleModal} className="btn-secondary mx-1" style={modalCancelable ? {} : { display: 'none' }}>Close</Button>
              </ModalFooter>
          </Modal>
      </div>
    </>
  );
}

export default Dashboard;