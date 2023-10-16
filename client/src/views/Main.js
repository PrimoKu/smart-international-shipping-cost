import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderList from '../components/OrderList';
import axios from 'axios';

function Main() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders/', { withCredentials: true });
        setData(response.data);
      } catch (error) {
        console.error("An error occurred while fetching data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='home-page'>
      <div className='left-panel'>
        <div className='menu-padding'></div>
        <div className='sub-header' style={{ width:'70%', marginLeft: 'auto', marginRight: 'auto'}}>GENERAL</div>
        <div style={{height: '100%', width:'70%', marginLeft: 'auto', marginRight: 'auto'}}>
          <Link style={{width:'80%'}} to='/home'>
            <button className='menu-button'>
              <img className='menu-button-image' src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"/>
              Home
            </button>
          </Link>
          <Link style={{width:'80%'}} to='/main'>
            <button className='menu-button'>
              <img className='menu-button-image' src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"/>
              Group Orders
            </button>
          </Link>
          <Link style={{width:'80%'}} to='/main'>
            <button className='menu-button'>
              <img className='menu-button-image' src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"/>
              Shipping
            </button>
          </Link>
          <Link style={{width:'80%'}} to='/main'>
            <button className='menu-button'>
              <img className='menu-button-image' src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg"/>
              Form Responses
            </button>
          </Link>
        </div>
      </div>
      <div className="right-panel">
        <OrderList data={data}/>
      </div>
    </div>
  );
}

export default Main;
