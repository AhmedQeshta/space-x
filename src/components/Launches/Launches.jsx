import React, { useEffect, useState } from 'react';
import Launch from './Launch';
import './launch.css';
import LoadingLaunches from './LoadingLaunches';
import NotFoundLaunches from './NotFoundLaunches';

const Launches = () => {
  const [launches, setLaunches] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    fetch('https://api.spacexdata.com/v4/launches/', {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setLaunches(data);
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
    return () => {
      abortController.abort();
    };
  }, []);

  const Launches = () => {
    return launches ? (
      launches.map((item) => {
        return <Launch key={item.id} launch={item} />;
      })
    ) : (
        <NotFoundLaunches />
    );
  };

  const Loading = () => {
    const postLoader = ['1', '2', '3', '4', '5', '6', '7', '8'];
    return loading && postLoader.map((item) => <LoadingLaunches key={item} />);
  };

  const Error = () => {
    return error && <NotFoundLaunches />;
  };

  return (
    <div className='launch pd-y'>
      <div className='section-header'>
        <h2 className='section-title'>Launches</h2>
      </div>

      <div className='launches-container container'>
        {loading ? <Loading /> : error ? <Error /> : <Launches />}
      </div>
    </div>
  );
};

export default Launches;
