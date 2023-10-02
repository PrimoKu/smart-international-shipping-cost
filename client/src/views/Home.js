import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home-page'>
      <h1>Welcome to the Dashboard App</h1>
      <div className='buttons-container'>
        <Link to='/login'>
          <button className='btn btn-primary'>Login</button>
        </Link>
        <Link to='/register'>
          <button className='btn btn-success'>Register</button>
        </Link>
        <Link to='/create-order'>
          <button className='btn btn-info'>Create Shipping Order</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
