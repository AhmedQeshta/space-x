import { useEffect, useState } from 'react';

function useNavbarHook(pathname) {
  const [height, setHeight] = useState(0);
  const [path, setPath] = useState(false);

  useEffect(() => {
    setPath(pathname.includes('launch'));
    window.addEventListener('scroll', () => setHeight(window.scrollY));
  }, [pathname]);

  return [height, path];
}

export default useNavbarHook;
