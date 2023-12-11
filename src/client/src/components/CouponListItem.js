// is a singular coupon displayed in CouponList in Checkout
import React, { useState } from 'react';
import '../assets/css/OrderItem.css';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';
import { useAuth } from "../contexts/AuthContext.js";
import { useNavigate } from 'react-router-dom';


function CouponListItem({coupon, checkout, toggleCouponModal, setCoupon}) {
  var expirationDate = new Date(coupon.expire_date);

  function convertTime(time) {
    var date = new Date(time).toLocaleDateString();
    return date;
  }

  function onClick() {
    if (checkout) {
      setCoupon(coupon);
      toggleCouponModal();
    }
    // window.location.assign(`groupOrder/${ident}`)
    
  }

  function getTimeDiffDays() {
    var currentTime = new Date();
    var diff = expirationDate.getTime() - currentTime.getTime(); 
    return diff > 0; 
  }

  const image =  "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
  const height = "35px";
  const width = height == "40px" ? "50px" : "auto";

  return (
  <>
    <Button className="item" onClick={onClick}>
      <Row>
        <Col md={8}>
          <Row>
            <Col>
              <div className="order-box">
                <img id="order-img" style={{float: "left", height: `${height}`, width: `${width}`, verticalAlign: "middle", marginRight: "10px"}}  src={image}></img>
                <div id="order-text" style={{float: "left"}}>
                  <div id="order-name" style={{fontSize: "larger", color: "white", fontFamily:"'Lucida Console', monospace"}}>Code: {coupon.code}</div>
                  <div id="order-time" style={{fontSize: "small", color: `${getTimeDiffDays() > 0 ? "gray" : "red"}`, fontFamily:"'Lucida Console', monospace"}}>Expiration Date: {convertTime(expirationDate)}</div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col>
          <div style={{fontSize: "large", float: "right", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "10px", color:`${'#41dc83'}`}}>${coupon.discount}.00</div>
        </Col>
      </Row>
    </Button>
  </>
  );
};

export default CouponListItem;
