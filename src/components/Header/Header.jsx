import React from 'react';

import './header.css';

const Header = () => {
  return (
    <div className="home" id="Home">
      <video autoPlay muted>
        <source src="/assets/cover.mp4" />
      </video>

      <div className="home-content">
        <h1 className="title">Welcome in your space!</h1>
      </div>
    </div>
  );
};

export default Header;
