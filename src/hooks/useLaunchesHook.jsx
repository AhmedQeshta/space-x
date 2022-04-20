import { useEffect, useState } from 'react';

export default function useLaunchesHook() {
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState({
    totalPages: 0,
    currentPage: 0,
    hasPrevPage: false,
    hasNextPage: false,
  });
  const [launches, setLaunches] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

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

  return [launches, filteredResults, error, loading, search, paginate, page,setPage,setFilteredResults,setSearch];
}
