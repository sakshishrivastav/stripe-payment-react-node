import React from "react";
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
function MainPage() {
  return (
    <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/products">Products</Link>
    </header>
  );
}

export default MainPage;
