import React from 'react';

import './header.css';
import video from '../../assets/cover.mp4';

const Header = () => {
  return (
    <div className="home" id="Home">
      <video autoPlay muted>
        <source src={video} />
      </video>

      <div className="home-content">
        <h1 className="title">Welcome in your space!</h1>
      </div>
    </div>
  );
};

export default Header;
