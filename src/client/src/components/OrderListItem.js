// is a singular order displayed in OrderList in Home, is NOT USED FOR INDIVIDUAL ORDERS
import React, { useState } from 'react';
import '../assets/css/OrderItem.css';
import {
  Row,
  Col,
} from 'reactstrap';
import { useAuth } from "../contexts/AuthContext.js";
import { useNavigate } from 'react-router-dom';


function OrderListItem({ident, name, deadline, countryCode}) {
  const navigate = useNavigate();
  const {user} = useAuth();

  var deadlineDate = new Date(deadline);

  function convertTime(time) {
    var date = new Date(time).toLocaleDateString();
    return date;
  }

  function onClick() {
    window.location.assign(`groupOrder/${ident}`)
    
  }

  function getTimeDiffDays() {
    var currentTime = new Date();
    var diff = deadlineDate.getTime() - currentTime.getTime(); 
    return Math.ceil(diff / (1000 * 3600 * 24)); 
  }

  function getTimeDiffWeeks() {
    var currentTime = new Date();
    var diff = deadlineDate.getTime() - currentTime.getTime(); 
    return Math.ceil(diff / (1000 * 3600 * 24 * 7)); 
  }

  function getTimeDiffHours() {
    var currentTime = new Date();
    var diff = deadlineDate.getTime() - currentTime.getTime(); 
    return Math.ceil(diff / (1000 * 3600)); 
  }

  function getTimeDiffMonths() {
    var currentTime = new Date();
    var months = (deadlineDate.getFullYear() - currentTime.getFullYear()) * 12;
    months -= currentTime.getMonth();
    months += deadlineDate.getMonth();
    return Math.ceil(months);
  }

  function getTimeDiffYears() {
    var currentTime = new Date();
    var diff = deadlineDate.getTime() - currentTime.getTime(); 
    var d = new Date(diff);
    return Math.ceil(d.getUTCFullYear() - 1970);
  }

  function getDeadlineColor() {
    if (deadline == undefined || deadline == null) {
      return "grey";
    }
    var daysLeft = getTimeDiffDays();
    if (daysLeft <= 1) {
      return "red"
    } else if (daysLeft <= 7) {
      return "yellow";
    } else {
      return "lightgreen";
    }
  }

  function getTimeRemaining() {
    if (deadline == undefined || deadline == null || deadline == "") {
      return "ERR";
    } else {
      var daysLeft = getTimeDiffDays();
      if (daysLeft <= 1) {
        return getTimeDiffHours() + " HOURS"
      } else if (daysLeft <= 7) {
        return getTimeDiffDays() + " DAYS"
      } else if (daysLeft <= 30) {
        return getTimeDiffWeeks() + " WEEKS"
      } else if (daysLeft <= 365) {
        return getTimeDiffMonths() + " MONTHS"
      } else {
        return getTimeDiffYears() + " YEARS"
      }
    }
  }

  var color = getDeadlineColor();

  const image = countryCode === "" || countryCode === undefined || countryCode === null ? 
    "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" : `https://flagsapi.com/${countryCode}/flat/64.png`;

  const height = countryCode === "" || countryCode === undefined || countryCode === null ? "35px" : "50px";
  const width = height == "40px" ? "50px" : "auto";

  return (
  <>
    <button className="item" onClick={() => onClick()}>
      <Row>
        <Col md={8}>
          <Row>
            <Col>
              <div className="order-box">
                <img id="order-img" style={{float: "left", height: `${height}`, width: `${width}`, verticalAlign: "middle", marginRight: "10px"}}  src={image}></img>
                <div id="order-text" style={{float: "left"}}>
                  <div id="order-name" style={{fontSize: "larger", color: "white", fontFamily:"'Lucida Console', monospace"}}>{name}</div>
                  <div id="order-time" style={{fontSize: "small", color:"gray", fontFamily:"'Lucida Console', monospace"}}>Deadline: {convertTime(deadline)}</div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col>
          <div style={{fontSize: "medium", float: "right", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "10px", color:`${color}`}}>{getTimeRemaining()}</div>
        </Col>
      </Row>
    </button>
  </>
  );
};

export default OrderListItem;
