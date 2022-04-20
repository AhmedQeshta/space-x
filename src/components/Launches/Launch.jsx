import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
const Launch = ({
  launch: {
    id,
    name,
    links: {
      patch: { large },
    },
    details,
  },
}) => {
  return (
    <div className="cont">
      <div className="launch-content">
        <div className="launch-item">
          <div>
            <LazyLoadImage src={large} alt={name} effect="opacity" />
          </div>
          <h2 className="launch-item-title">{name}</h2>
          <Link to={`/launch/${id}`} className="launch-item-link">
            read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Launch;
