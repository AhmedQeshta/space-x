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
  function RenderLaunches({ data }) {
    return data.map((item) => {
      return <Launch key={item.id} launch={item} />;
    });
  }

  /**
   * Launches Pagination Component
   */
  function LaunchesPagination() {
    const changePage = (numberPage) => {
      if (numberPage !== paginate.currentPage) {
        setPage(numberPage);
      }
    };
    const launchesArray = new Array(paginate.totalPages).fill(null);

    return (
      launchesArray.length > 0 && (
        <>
          {launchesArray.map((item, index) => {
            const pageNumber = index + 1;
            return (
              <button
                title={pageNumber}
                type="button"
                className={`number-button ${
                  paginate.currentPage === pageNumber ? 'active-page' : ''
                }`}
                key={pageNumber}
                onClick={() => changePage(pageNumber)}>
                {pageNumber}
              </button>
            );
          })}
        </>
      )
    );
  }

  /**
   * Pagination button Component
   */
  function Pagination() {
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
      <div className="pagination">
        <button
          title="Prevues"
          type="button"
          className={`pagination-button ${
            paginate.currentPage === 1 ? 'active-page' : ''
          }`}
          onClick={prevPage}>
          Prevues
        </button>
        <LaunchesPagination />
        <button
          title="Next"
          type="button"
          className={`pagination-button ${
            paginate.currentPage === paginate.totalPages ? 'active-page' : ''
          }`}
          onClick={nextPage}>
          Next
        </button>
      </div>
    );
  }

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

  function LaunchesComponents() {
    if (loading) {
      const postLoader = [1, 2, 3, 4, 5, 6, 7, 8];
      return (
        loading && postLoader.map((item) => <LoadingLaunches key={item} />)
      );
    }
    if (error) {
      return <NotFoundLaunches />;
    }
    return (
      <RenderLaunches data={search.length > 1 ? filteredResults : launches} />
    );
  }

  function PaginateLaunches() {
    return !loading && !error && search.length < 1 && <Pagination />;
  }

  return (
    <div className="launch pd-y">
      <div className="section-header">
        <h2 className="section-title">Launches</h2>
      </div>

      <div className="container">
        <FilterByName search={search} updateSearch={updateSearch} />
      </div>

      <div className="launches-container container">
        <LaunchesComponents />
      </div>
      <PaginateLaunches />
    </div>
  );
}
