import { useState } from 'react';

import Sidebar from './sidebar';
import Backdrop from './backdrop';
import { Outlet } from 'react-router-dom';
import './toolbar.css';

const Toolbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const togglesidebar = () => {
    setSidebar((prevstate) => !prevstate);
  };

  return (
    <>
      <div className="tool-bar">
        <div className="title">
          <a className="btnheader" onClick={togglesidebar}>
            <i className="fa fa-bars" aria-hidden="true"></i>
            Menu
          </a>
        </div>

        <div className="heading">
          <b>CBP MARKETPLACE</b>
        </div>

        <div className="shoppingcart">
          <i class="fa fa-shopping-cart"></i>
        </div>

        <div className="notification">
          <i class="fa fa-bell"></i>
        </div>
      </div>

      <Outlet />
      <Backdrop sidebar={sidebar} closeSidebar={togglesidebar} />
      <Sidebar sidebar={sidebar} closeSidebar={togglesidebar} />
    </>
  );
};

export default Toolbar;
