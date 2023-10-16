import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationPopup from '../components/ConfirmationPopup';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  ButtonGroup
} from "reactstrap";

function Checkout() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const orders = [
    {
      "name": "John Doe",
      "item": "Widget",
      "item_weight": 0.5,
      "price": 10.99,
      "approved": false,
    },
    {
      "name": "Alice Smith",
      "item": "Gadget",
      "item_weight": 0.8,
      "price": 19.99,
      "approved": false,
    },
    {
      "name": "Bob Johnson",
      "item": "Tool",
      "item_weight": 1.2,
      "price": 24.95,
      "approved": true,
    },
    {
      "name": "Eva Williams",
      "item": "Accessory",
      "item_weight": 0.3,
      "price": 5.49,
      "approved": true,
    },
    {
      "name": "Michael Brown",
      "item": "Toy",
      "item_weight": 0.6,
      "price": 12.75,
      "approved": false,
    }
  ];
  const isApproved = orders.every(obj => obj.approved === true);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Group Order</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Item</th>
                      <th>Item Weight</th>
                      <th className="text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr>
                      <td>{order.name}</td>
                      <td>{order.item}</td>
                      <td>{order.item_weight}</td>
                      <td className="text-center">{order.price}</td>
                    </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="text-center">{orders.reduce((acc, order) => acc + order.price, 0).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Link to='/home'>
            <Button>Return to Home</Button>
          </Link>
          <Button onClick={togglePopup} disabled={!isApproved}>Submit Order</Button>
          <ConfirmationPopup show={showPopup} toggle={togglePopup} />
          <ButtonGroup>
    <UncontrolledDropdown>
      <DropdownToggle caret>
        User Agreement
      </DropdownToggle>
      <DropdownMenu>
        {orders.map(order => <DropdownItem header 
        style={{color: order.approved ? 'black' : 'gray'}}>
          {order.name}
        </DropdownItem> )}

      </DropdownMenu>
    </UncontrolledDropdown>
  </ButtonGroup>
        </Row>
      </div>
    </>
  );
}

export default Checkout;
