import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SingleLaunchLoading from './SingleLaunchLoading';
import NotFoundLaunches from '../Launches/NotFoundLaunches';
import './singleLaunch.css';

const SingleLaunch = () => {
  const [launch, setLaunch] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    fetch(`https://api.spacexdata.com/v4/launches/${id}`, {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setLaunch(data);
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    return () => abortController.abort();
  }, [id]);

  const checkLaunch = () => Object.keys(launch).length;

  const Loading = () => loading && <SingleLaunchLoading />;

  const Error = () => error && <NotFoundLaunches />;

  const Launch = () => (
    <div>
      {checkLaunch() && (
        <>
          <div className='launch-head'>
            <h2 className='launch-title'>{launch.name}</h2>
            {launch.success ? (
              <p className='patch success'>Success</p>
            ) : (
              <p className='patch failed'>Failed</p>
            )}
          </div>
          <p className='launch-desc'>{launch.details}</p>
          <button
            onClick={() => window.open(launch.links.article, '_blank')}
            className='read-more'>
            Read More
          </button>
          <iframe
            width='1350'
            height='480'
            src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
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
