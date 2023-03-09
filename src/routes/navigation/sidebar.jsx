import './sidebar.css';

import { Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/userSlice';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';

const Sidebar = ({ sidebar, closeSidebar }) => {
  const userLogInfo = useContext(UserContext);
  const dispatch = useDispatch();

  const user1 = useSelector(selectUser);
  console.log(user1);
  const signoutHandler = () => {
    userLogInfo.setIsLoggedIn(false);
    closeSidebar();
    dispatch(logout());
  };

  // const navigate = useNavigate();

  console.log(userLogInfo, 'userloginfo');

  return (
    <div className={sidebar ? 'sidebar sidebar--open' : 'sidebar'}>
      <div className="close" onClick={closeSidebar}>
        {' '}
        X{' '}
      </div>

      <li>
        <Link className="nav-link" to="/" onClick={closeSidebar}>
          Home
        </Link>
      </li>
      {!userLogInfo.isLoggedIn ? (
        <>
          <li>
            <Link className="nav-link" to="/SignupBuyer" onClick={closeSidebar}>
              Signup as a Buyer
            </Link>
          </li>
          <li>
            <Link
              className="nav-link"
              to="/SignupSeller"
              onClick={closeSidebar}
            >
              Signup as a Seller
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/LoginBuyer" onClick={closeSidebar}>
              Login as a Buyer
            </Link>
          </li>

          <li>
            <Link className="nav-link" to="/LoginSeller" onClick={closeSidebar}>
              Login as a Seller
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            {/* <Link className="nav-link" to='/' onClick={signoutHandler} >  
                            Signout  */}

            {
              <div style={{ display: 'block', width: 700, padding: 30 }}>
                <h4>{user1.email}</h4>
                <Dropdown>
                  <Dropdown.Toggle variant="success">Open Menu</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Home Page</Dropdown.Item>
                    <Dropdown.Item href="#">Settings</Dropdown.Item>
                    <Dropdown.Item href="/">
                      <Link
                        className="nav-link"
                        to="/"
                        onClick={signoutHandler}
                      >
                        Logout
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            }
            {/* </Link> */}
          </li>
        </>
      )}
    </div>
  );
};

export default Sidebar;
