import React from 'react';

import ContentLoader from 'react-content-loader';

const LoadingLaunches = () => {
  return (
    <div className='launch__loading'>
      <ContentLoader
        seed={2}
        width={450}
        height={350}
        viewBox='0 0 450 350'
        backgroundColor='#d1d1d1'
        foregroundColor='#f5f5f5'>
        <rect x='1' y='0' rx='8' ry='8' width='300' height='293' />
        <rect x='70' y='300' rx='5' ry='5' width='154' height='13' />
        <rect x='100' y='320' rx='5' ry='5' width='79' height='24' />
      </ContentLoader>
    </div>
  );
};

export default LoadingLaunches;
