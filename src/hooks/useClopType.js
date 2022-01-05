import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useClopType = () => {
  const location = useLocation();
  const [clopType, setClopType] = useState('heavy');

  useEffect(() => {
    if (location.pathname === '/us-light') return setClopType('light');
    if (location.pathname === '/ru-light') return setClopType('light');
    if (location.pathname === '/us') return setClopType('heavy');
    if (location.pathname === '/ru') return setClopType('heavy');

    setClopType('heavy');
  }, [location.pathname]);

  return clopType;
};

export { useClopType };
