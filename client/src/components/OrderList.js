// is a singular order displayed in OrderList in Home, is NOT USED FOR INDIVIDUAL ORDERS
import React, { useState } from 'react';
import OrderListItem from './OrderListItem';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid'; 

import '../assets/css/OrderItem.css';

function OrderList({ data }) {

  if (data.length >= 3) {
    data = data.slice(0, 3);
  }
  if (data.length == 0) {
    return (
      <div>
        <h1 className="head" style={{width: 'fit-content',display: 'inline-block'}}>Dashboard</h1>
        <div style={{width:'20%', display: 'inline-block', marginLeft: 'auto', marginRight: 'auto'}}>
          <Link style={{width:'20%'}} to='/createorder'>
            <button>New Order</button>
          </Link>
        </div>
        <div className="container-left">No orders here...</div>
        <div className="container-right">No orders here...</div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1 className="head" style={{width: '70%',display: 'inline-block'}}>Dashboard</h1>
          <div style={{width:'20%', display: 'inline-block', marginLeft: 'auto', marginRight: 'auto'}}>
            <Link style={{width:'20%'}} to='/createorder'>
              <button className='new-order-button'>New Order</button>
            </Link>
          </div>
        </div>
          <div className="container-left">
            <h3 className="mini-header">GO's you joined</h3>
            {data.map(order => (
              <OrderListItem key={order._id} ident={order._id} name={order.name} price={order.price} 
                            updatedAt={order.updatedAt} createdAt={order.createdAt} status={order.status} weight={order.weight} />
            ))}
          </div>
          <div className="container-right">
            <h3 className="mini-header">GO's you manage</h3>
            {data.map(order => (
              <OrderListItem key={order._id} ident={order._id} name={order.name} price={order.price} 
                            updatedAt={order.updatedAt} createdAt={order.createdAt} status={order.status} weight={order.weight} />
            ))}
          </div>
      </div>
    );
  }
};

export default OrderList;