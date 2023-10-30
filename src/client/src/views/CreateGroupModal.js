import React, { useState } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';

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


function CreateOrderModal({ isOpen, toggle }) {
  const location = useLocation();
  const groupOrderId = location.state?.groupOrder_id;
  const [order, setOrder] = useState({
    name: '',
    price: '',
    weight: '',
    groupOrder_id: '',
    date: '',
  });
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
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Order</ModalHeader>
      <ModalBody>
        <Form>
            <FormGroup>
              <Label for='name'>Order Name</Label>
              <Input
                type='text'
                id='name'
                placeholder='Enter order name'
                value={order.name}
                onChange={(e) => setOrder({ ...order, name: e.target.value })}
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
              />
            </FormGroup>
            <Button color='info' size='lg' block onClick={handleSubmit}>
              Submit
            </Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateGroupModal;


