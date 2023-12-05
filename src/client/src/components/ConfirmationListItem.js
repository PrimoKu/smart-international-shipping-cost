import React, { useState } from 'react';
import '../assets/css/OrderItem.css';
import {
  Row,
  Col,
} from 'reactstrap';
import { ListGroup } from 'reactstrap';

function ConfirmationListItem({ident, name, lastUpdatedAt, status, countryCode}) {

  var color = getColor();
  function convertTime(time) {
    var date = new Date(time).toLocaleDateString();
    return date;
  }

  function onClick() {
    window.location.assign(`groupOrder/${ident}`)
  }

  function getStatus() {
    if (status === 2) {
      return "UNSHIPPED";
    } else if (status == 3) {
      return "SHIPPING";
    } else if (status == 1) {
      return "CANCELED"
    } else if (status == 4) {
      return "DELIVERED";
    }
  }

  function getColor() {
    if (status === 2) {
      return "red";
    } else if (status === 3) {
      return "white";
    } else if (status === 1) {
      return "gray"
    } else if (status === 4) {
      return "lightgreen";
    }
  }

  const image = countryCode === "" || countryCode === undefined || countryCode === null ? 
    "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" : `https://flagsapi.com/${countryCode}/flat/64.png`;

  const height = countryCode === "" || countryCode === undefined || countryCode === null ? "23px" : "32px";


  return (
  <>
    <button className="item" onClick={() => onClick()}>
      <Row>
        <Col>
          <img id="order-img" style={{float: "left", height: `${height}`, verticalAlign: "middle", paddingRight: "5px", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "5px"}}  src={image}></img>
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