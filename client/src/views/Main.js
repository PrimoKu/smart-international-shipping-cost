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
        <div style={{height: '100%', width:'80%', marginLeft: 'auto', marginRight: 'auto'}}>
          <Link style={{width:'80%'}} to='/home'>
            <button className='menu-button'>Home</button>
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
