'use client';

import { endpoints } from '@/constants';
import { useEffect, useState } from 'react';

const ClientApiData = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(endpoints.user.get);
      const data = await res.json();
      setData(JSON.stringify(data.user.name));
    };
    getData();
  }, []);

  return (
    <div>
      <h2>This is from client-side api call</h2>
      <pre>{data}</pre>
    </div>
  );
};

export default ClientApiData;
