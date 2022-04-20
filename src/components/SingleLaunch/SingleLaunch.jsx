import React from 'react';
import { useParams } from 'react-router-dom';
import SingleLaunchLoading from './SingleLaunchLoading';
import NotFoundLaunches from '../Launches/NotFoundLaunches';
import './singleLaunch.css';
import useLaunchHook from '../../hooks/useLaunchHook';

const SingleLaunch = () => {
  const { id } = useParams();
  const [launch, error, loading] = useLaunchHook(id);

  /**
   * check Has Launch
   */
  const checkLaunch = () => Object.keys(launch).length;

  /**
   * Loading Component
   */
  const Loading = () => loading && <SingleLaunchLoading />;

  /**
   * Error Component
   */
  const Error = () => error && <NotFoundLaunches />;

  /**
   * Launch Component
   */
  const { name, success, details, links } = launch;
  const Launch = () => (
    <div>
      {checkLaunch() && (
        <>
          <div className='launch-head'>
            <h2 className='launch-title'>{name}</h2>
            <p className={`patch ${success ? 'success' : 'failed'}`}>
              {success ? 'Success' : 'Failed'}
            </p>
          </div>
          <p className='launch-desc'>{details}</p>
          <button
            onClick={() => window.open(links.article, '_blank')}
            className='read-more'>
            Read More
          </button>
          <iframe
            width='1350'
            height='480'
            src={`https://www.youtube.com/embed/${links.youtube_id}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='launch-video'></iframe>
        </>
      )}
    </div>
  );

  return (
    <div className={!error ? 'launch-details' : 'launch-details fail'}>
      {loading ? <Loading /> : error ? <Error /> : <Launch />}
    </div>
  );
};

export default SingleLaunch;
