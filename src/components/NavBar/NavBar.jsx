import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import './navbar.css';

const NavBar = () => {
  const [height, setHeight] = useState(0);
  window.addEventListener('scroll', () => setHeight(window.scrollY));
  let { pathname } = useLocation();

  const [path, setPath] = useState(false);

  useEffect(() => {
    setPath(pathname.includes('launch'));
  }, [pathname]);

  const checkHeight = () => {
    if (!path && height >= 500) return 'background';
    else if (path) return 'details';
  };

  const scrollToElement = (height) => {
    window.scrollTo({
      top: height,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`header ${checkHeight()}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <NavLink className="logo-link" to="/">
              SpaceX
            </NavLink>
          </div>
          {!path && (
            <ul className="nav">
              <li>
                <button className="active" onClick={() => scrollToElement(0)}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToElement(760)}>Solar</button>
              </li>
              <li>
                <button onClick={() => scrollToElement(1360)}>Launches</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
