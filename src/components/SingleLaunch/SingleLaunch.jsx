import React from 'react';
import { useParams } from 'react-router-dom';
import SingleLaunchLoading from './SingleLaunchLoading';
import NotFoundLaunches from '../Launches/NotFoundLaunches';
import './singleLaunch.css';
import useLaunchHook from '../../hooks/useLaunchHook';

function SingleLaunch() {
  const { id } = useParams();
  const [launch, error, loading] = useLaunchHook(id);

  /**
   * check Has Launch
   */
  const checkLaunch = () => Object.keys(launch).length;

  /**
   * Launch Component
   */
  const { name, success, details, links } = launch;
  function Launch() {
    return (
      <div>
        {checkLaunch() && (
          <>
            <div className="launch-head">
              <h2 className="launch-title">{name}</h2>
              <p
                title="Type"
                className={`patch ${success ? 'success' : 'failed'}`}>
                {success ? 'Success' : 'Failed'}
              </p>
            </div>
            <p title="details" className="launch-desc">
              {details}
            </p>
            <button
              type="button"
              title="See more"
              onClick={() => window.open(links.article, '_blank')}
              className="read-more">
              Read More
            </button>
            <iframe
              width="1350"
              height="480"
              src={`https://www.youtube.com/embed/${links.youtube_id}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="launch-video"
            />
          </>
        )}
      </div>
    );
  }

  function LaunchComponent() {
    if (loading) {
      return <SingleLaunchLoading />;
    }
    if (error) {
      return <NotFoundLaunches />;
    }
    return <Launch />;
  }

  return (
    <div className={!error ? 'launch-details' : 'launch-details fail'}>
      {LaunchComponent()}
    </div>
  );
}

export default SingleLaunch;
