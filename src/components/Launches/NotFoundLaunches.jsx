import React from 'react';

import NotFoundImage from '../../assets/notFound_Launches.svg';

export default function NotFoundLaunches() {
  return (
    <div>
      <div className='not-found-image-card'>
        <img
          className='not-found-image'
          src={NotFoundImage}
          alt='Page not found'
        />
      </div>
      <h3 className='not-found-title'>
        No Launches, Maybe Something Went Wrong!
      </h3>
    </div>
  );
}
