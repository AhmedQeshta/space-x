import React from 'react';
import useLaunchesHook from '../../hooks/useLaunchesHook';
import FilterByName from '../Filter/FilterByName';
import Launch from './Launch';
import './launch.css';
import LoadingLaunches from './LoadingLaunches';
import NotFoundLaunches from './NotFoundLaunches';

export default function Launches() {
  const [
    launches,
    filteredResults,
    error,
    loading,
    search,
    paginate,
    page,
    setPage,
    setFilteredResults,
    setSearch,
  ] = useLaunchesHook();
  /**
   * Launches Component
   * @param  {} {data}
   */
  const Launches = ({ data }) => {
    return data ? (
      data.map((item) => {
        return <Launch key={item.id} launch={item} />;
      })
    ) : (
      <NotFoundLaunches />
    );
  };

  /**
   * Loading Component
   */
  const Loading = () => {
    const postLoader = new Array(8).fill(null);
    return (
      loading && postLoader.map((_, index) => <LoadingLaunches key={index} />)
    );
  };

  /**
   * Error Component
   */
  const Error = () => {
    return error && <NotFoundLaunches />;
  };

  /**
   * Launches Pagination Component
   */
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

  /**
   * Pagination button Component
   */
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

  /**
   * Update Search Input
   */
  const updateSearch = ({ target: { value } }) => {
    setSearch(value);

    if (search !== '') {
      const filterResult = launches.filter(({ name }) => {
        return name.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredResults(filterResult);
    } else {
      setFilteredResults(launches);
    }
  };

  return (
    <div className='launch pd-y'>
      <div className='section-header'>
        <h2 className='section-title'>Launches</h2>
      </div>

      <div className='container'>
        <FilterByName search={search} updateSearch={updateSearch} />
      </div>

      <div className='launches-container container'>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          <>
            <Launches data={search.length > 1 ? filteredResults : launches} />
          </>
        )}
      </div>
      {!loading && !error && search.length < 1 && <Pagination />}
    </div>
  );
}
