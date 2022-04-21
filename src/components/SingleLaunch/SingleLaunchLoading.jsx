import ContentLoader from 'react-content-loader';
import React from 'react';

function SingleLaunchLoading() {
  return (
    <div className="launch__loading">
      <ContentLoader height="800" width="1600" viewBox="0 0 350 265">
        <rect x="0" y="20" rx="4" ry="4" width="50" height="10" />
        <rect x="300" y="20" rx="4" ry="4" width="50" height="10" />
        <rect x="0" y="35" rx="2" ry="2" width="250" height="10" />
        <rect x="0" y="50" rx="2" ry="2" width="60" height="10" />
        <rect x="0" y="65" rx="2" ry="2" width="1500" height="180" />
      </ContentLoader>
    </div>
  );
}

export default SingleLaunchLoading;
