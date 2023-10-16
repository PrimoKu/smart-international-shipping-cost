// is a singular order displayed in OrderList in Home, is NOT USED FOR INDIVIDUAL ORDERS
import React, { useState } from 'react';
import '../assets/css/OrderItem.css';
import { ListGroup } from 'reactstrap';

function OrderListItem({ident, name, price, updatedAt, createdAt, status, weight}) {

  return (
  <>
    <button className="item" onClick={() => {console.log('clicked!')}}>
      <div className="order-box">
        <img id="order-img" style={{float: "left", height: "20px", verticalAlign: "middle", paddingRight: "5px"}}  src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
        <div id="order-text">
          <div id="order-name" style={{fontSize: "larger"}}>{name}</div>
          <div id="order-time" style={{fontSize: "small", color:"gray"}}>{updatedAt}</div>
        </div>
      </div>
    </button>
  </>
  );
};

export default OrderListItem;