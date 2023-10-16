// contains the list of orders seen in the home screen, IS NOT FOR INDIVIDUAL ORDERS
import React, { useState } from 'react';

function OrderList({ data }) {

  return (
    <div className="my-list">
      {data.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </div>
  );
};

export default OrderList;