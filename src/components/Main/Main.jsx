import React from 'react';

import './main.css';
import solar from '../../assets/solar.jpg';

export default function Main() {
  return (
    <div className='Solar pd-y'>
      <div className='container solar-section'>
        <div className='Solar-item'>
          <div className='section-header'>
            <h2 className='section-title'>What is the Solar System?</h2>
          </div>
          <p className='Solar-item-desc'>
            The Solar System is the gravitationally bound system of the Sun and
            the objects that orbit it, either directly or indirectly. Of the
            objects that orbit the Sun directly, the largest are the eight
            planets, with the remainder being smaller objects, the dwarf planets
            and small Solar System bodies. Of the objects that orbit the Sun
            indirectly—the natural satellites—two are larger than the smallest
            planet, Mercury.
          </p>
        </div>

        <div className='Solar-item'>
          <div className='Solar-item-img'>
            <img src={solar} alt='Solar' />
          </div>
        </div>
      </div>
    </div>
  );
}
