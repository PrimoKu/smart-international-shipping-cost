import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle, Button, CardImgOverlay, CardImg, CardText } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from 'assets/img/react-logo.png';
import animation from '../assets/img/planecrop.gif';
import friends from '../assets/img/friends.png';
import shopping from '../assets/img/shopping.gif';
import items from '../assets/img/items.gif';
import ship from '../assets/img/shipper.gif';

function Home() {
  return (
    <div className='wrapper'>
      <div className='main-panel'>
        <div className='center-content' style={{marginTop: "25px"}}>
          <Card>
            <Row>
              <Col md={8}>
                <CardImg 
                  src={animation}>
                </CardImg>
              </Col>
              <Col className='text-center'>
                <Row className='h-30' style={{marginTop: "40px", color: "white"}}>
                  <CardBody tag='h1' style={{marginBottom: "10px"}}>BlueJay Express</CardBody>
                </Row>
                <Row>
                  <CardBody>
                    <CardTitle tag='h3' style={{marginBottom: "5px"}}>Get Started</CardTitle>
                  </CardBody>
                  <CardBody>
                    <Link to='/login'>
                      <Button color='info' size='lg' className='mr-3'>
                        Login
                      </Button>
                    </Link>
                    <Link to='/register'>
                      <Button color='success' size='lg'>
                        Register
                      </Button>
                    </Link>
                  </CardBody>
                </Row>
              </Col>
            </Row>
          </Card>
          <Card>
            <CardTitle className='text-center' tag='h2' style={{marginTop: "5px", marginLeft: "5px", paddingTop: "10px",fontFamily:"'Lucida Console', monospace"}}>Our Mission:</CardTitle>
            <CardTitle className='text-center' tag='h3' style={{marginTop: "5px", marginLeft: "5px", fontFamily:"'Lucida Console', monospace"}}>To make international shipping affordable, one order at a time.</CardTitle>
          </Card>
          <Card>
            <Row>
              <Col>
                <CardTitle tag='h2' className='text-center' style={{marginTop: "10px", marginLeft: "3vw", paddingTop: "10px"}}>Step 1: Find a group!</CardTitle>
                <CardText tag='h3' className='text-center' style={{marginTop: "35px", marginLeft: "5vw", marginBottom:"10px", paddingTop: "10px"}}>Find/form a group and start saving.</CardText>
              </Col>
              <Col style={{width: "50%"}}>
                <CardImg src={friends}></CardImg>
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col style={{width: "50%"}}>
                <CardImg src={items}></CardImg>
              </Col>
              <Col>
                <CardTitle className='text-center align-self-center' tag='h2' style={{marginTop: "10px", paddingTop: "10px"}}>Step 2: Load up your cart!</CardTitle>
                <CardText className='text-center align-self-center' tag='h3' style={{marginTop: "35px", marginLeft: "2vw", marginBottom:"10px", paddingTop: "10px"}}>Enter your orders, and set them up for delivery.</CardText>
              </Col>
            </Row>
          </Card>
          <Card>
            <Row>
              <Col>
                <CardTitle className='text-center align-self-center' tag='h2' style={{marginTop: "10px", paddingTop: "10px"}}>Last Step: Shipper arrives on the scene.</CardTitle>
                <CardText className='text-center align-self-center' tag='h3' style={{marginTop: "35px", marginBottom:"10px", marginLeft: "2vw", paddingTop: "10px"}}>Await a speedy delivery from our international shippers!</CardText>
              </Col>
              <Col style={{width: "50%"}}>
                <CardImg src={ship}></CardImg>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
