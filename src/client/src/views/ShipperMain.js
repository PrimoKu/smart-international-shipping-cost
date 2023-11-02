
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Table,
    Modal, ModalHeader, ModalBody, ModalFooter, Row,
} from 'reactstrap';

function ShipperMain() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/groupOrders/', { withCredentials: true });
                console.log(response.data);
                setData(response.data);

            } catch (error) {
                console.error("An error occurred while fetching data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <Row>
        
        <Col md="12">
            <Card>
            <CardHeader>
                <h2 className="title">All group orders</h2>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {data.managed?.map(item => (
                      <tr>
                      <td>{item.name}</td>
                      <td>{item.country}</td>
                      
                    </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          </Row>)
        ;


};

export default ShipperMain;
