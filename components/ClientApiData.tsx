'use client';

import { useEffect, useState } from 'react';

const END_POINT = '/api/user';

const ClientApiData = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(END_POINT);
      const data = await res.json();
      setData(JSON.stringify(data));
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
