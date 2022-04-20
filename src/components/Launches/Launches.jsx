import React, { useEffect, useState } from 'react';
import Launch from './Launch';
import './launch.css';
import LoadingLaunches from './LoadingLaunches';
import NotFoundLaunches from './NotFoundLaunches';

const Launches = () => {
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState({
    totalPages: 0,
    currentPage: 0,
    hasPrevPage: false,
    hasNextPage: false,
  });
  const [launches, setLaunches] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    // https://api.spacexdata.com/v4/launches
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      signal: abortController.signal,
      body: JSON.stringify({ options: { page, limit: 12 } }),
    };
    fetch('https://api.spacexdata.com/v4/launches/query', options)
      .then((res) => res.json())
      .then(({ totalPages, hasPrevPage, hasNextPage, docs: data }) => {
        setPaginate({
          totalPages,
          currentPage: page,
          hasPrevPage,
          hasNextPage,
        });

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
  }, [page]);

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
    const postLoader = new Array(8).fill(null);
    return (
      loading && postLoader.map((_, index) => <LoadingLaunches key={index} />)
    );
  };

  const Error = () => {
    return error && <NotFoundLaunches />;
  };

  const LaunchesPagination = () => {
    const changePage = (page) => {
      if (page !== paginate.currentPage) {
        setPage(page);
      }
    };
    const launchesArray = new Array(paginate.totalPages).fill(null);

    return (
      launchesArray.length > 0 && (
        <>
          {launchesArray.map((item, index) => {
            return (
              <button
                title={index + 1}
                className={`number-button ${
                  paginate.currentPage === index + 1 ? 'active-page' : ''
                }`}
                key={index + 1}
                onClick={() => changePage(index + 1)}>
                {index + 1}
              </button>
            );
          })}
        </>
      )
    );
  };

  const Pagination = () => {
    const nextPage = () => {
      if (paginate.hasNextPage) {
        setPage(page + 1);
      }
    };
    const prevPage = () => {
      if (paginate.hasPrevPage) {
        setPage(page - 1);
      }
    };
    return (
      <div className='pagination'>
        <button
          title='Prevues'
          className={`pagination-button ${
            paginate.currentPage === 1 ? 'active-page' : ''
          }`}
          onClick={prevPage}>
          Prevues
        </button>
        <LaunchesPagination />
        <button
          title='Next'
          className={`pagination-button ${
            paginate.currentPage === paginate.totalPages ? 'active-page' : ''
          }`}
          onClick={nextPage}>
          Next
        </button>
      </div>
    );
  };

  return (
    <div className='launch pd-y'>
      <div className='section-header'>
        <h2 className='section-title'>Launches</h2>
      </div>

      {/* Create Filter by name and Successfully for failed */}

      <div className='launches-container container'>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <>
            <Launches />
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
};

export default Launches;
