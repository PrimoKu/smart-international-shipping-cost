// is a singular order displayed in OrderList in Home, is NOT USED FOR INDIVIDUAL ORDERS
import React, { useState } from 'react';
import '../assets/css/OrderItem.css';
import { ListGroup } from 'reactstrap';

function OrderListItem({ident, name, updatedAt}) {

  function convertTime(time) {
    var date = new Date(time).toLocaleDateString();
    return date;
  }

  function onClick() {
    window.location.assign(`groupOrder/${ident}`)
  }

  return (
  <>
    <button className="item" onClick={() => onClick()}>
      <div className="order-box">
        <img id="order-img" style={{float: "left", height: "20px", verticalAlign: "middle", paddingRight: "5px"}}  src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"></img>
        <div id="order-text">
          <div id="order-name" style={{fontSize: "larger", color: "white", fontFamily:"'Lucida Console', monospace"}}>{name}</div>
          <div id="order-time" style={{fontSize: "small", color:"gray", fontFamily:"'Lucida Console', monospace"}}>Last Updated: {convertTime(updatedAt)}</div>
        </div>
      </div>
    </button>
  </>
  );
};

export default OrderListItem;