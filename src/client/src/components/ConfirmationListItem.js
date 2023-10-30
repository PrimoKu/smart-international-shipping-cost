import React, { useState } from 'react';
import '../assets/css/OrderItem.css';
import {
  Row,
  Col,
} from 'reactstrap';
import { ListGroup } from 'reactstrap';

function ConfirmationListItem({ident, name, lastUpdatedAt, status}) {

  var color = getColor();
  function convertTime(time) {
    var date = new Date(time).toLocaleDateString();
    return date;
  }

  function onClick() {
    window.location.assign(`groupOrder/${ident}`)
  }

  function getStatus() {
    if (status === 1) {
      return "UNSHIPPED";
    } else if (status == 2) {
      return "IN PROGRESS";
    } else if (status == 3) {
      return "CANCELED"
    } else if (status == 0) {
      return "COMPLETE";
    }
  }

  function getColor() {
    if (status === 1) {
      return "red";
    } else if (status === 2) {
      return "yellow";
    } else if (status === 3) {
      return "gray"
    } else if (status === 0) {
      return "lightgreen";
    }
  }

  return (
  <>
    <button className="item" onClick={() => onClick()}>
      <Row>
        <Col>
          <img id="order-img" style={{float: "left", height: "20px", verticalAlign: "middle", paddingRight: "5px", display: "flex", justifyContent: "center", alignItems: "center"}}  src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
          <div className="order-box">
            <div id="order-text">
              <div id="order-name" style={{fontSize: "larger", color: "white", fontFamily:"'Lucida Console', monospace"}}>{name}</div>
            </div>
          </div>
        </Col>
        <Col>
          <div id="order-time" style={{fontSize: "small", color:"gray", fontFamily:"'Lucida Console', monospace", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>Last Updated: {convertTime(lastUpdatedAt)}</div>
        </Col>
        <Col>
          <div style={{float: "right", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "50px", color:`${color}`}}>{getStatus()}</div>
        </Col>
      </Row>
    </button>
  </>
  );
};

export default ConfirmationListItem;