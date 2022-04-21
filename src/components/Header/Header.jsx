import React from 'react';
import video from '../../assets/cover.mp4';
import './header.css';

export default function Header() {
  return (
    <div className="home" id="Home">
      <video autoPlay muted loop>
        <source src={video} />
      </video>

      <div className="home-content">
        <h1 className="title">Welcome in your space!</h1>
      </div>
    </div>
  );
}
