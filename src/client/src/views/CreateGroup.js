import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

function CreateGroup() {
  const [group, setGroup] = useState({
    name: '',
    country: '',
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


    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/groupOrders/`, formData, { withCredentials: true })
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
  return (
    <div className='wrapper'>
      <div className='main-panel'>
        <div className='navbar'>
          <h1 className='brand-text'>Create Group</h1>
        </div>
        <div className='center-content'>
          <Card className='text-center'>
            <CardBody>
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
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='country'>Country</Label>
                  <Input
                    type='text'
                    id='country'
                    placeholder='Enter country'
                    value={group.country}
                    onChange={(e) => setGroup({ ...group, country: e.target.value })}
                  />
                </FormGroup>

                <Button color='info' size='lg' block onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
          <Modal isOpen={modal} toggle={toggleModal} keyboard={modalCancelable} onClosed={handleModalClosed}>
            <ModalHeader toggle={toggleModal}>
              <div className="text-dark mb-0" style={{ fontSize: '30px' }}>{modalTitle}</div>
            </ModalHeader>
            <ModalBody style={{ height: '75px' }}><p style={{ fontSize: '20px' }}>{modalContent}</p></ModalBody>
            <ModalFooter style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
              <Button color="secondary" onClick={toggleModal} style={modalCancelable ? {} : { display: 'none' }}>Close</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;


