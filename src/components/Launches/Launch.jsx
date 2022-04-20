import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const Launch = ({
  launch: {
    id,
    name,
    links: {
      patch: { large },
    },
  },
}) => {
  return (
    <div className='cont'>
      <div className='launch-content'>
        <div className='launch-item'>
          <div>
            <LazyLoadImage
              src={large ?? 'https://imgur.com/573IfGk.png'}
              alt={name}
              effect='blur'
            />
          </div>
          <h2 className='launch-item-title'>{name}</h2>
          <Link to={`/launch/${id}`} className='launch-item-link'>
            read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Launch;
