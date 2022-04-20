import { useEffect, useState } from 'react';

export default function useLaunchHook(id) {
  const [launch, setLaunch] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return [launch, error, loading];
}
