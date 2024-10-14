import { useEffect, useState } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_STRAPI}`
          }
        });
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data', err);
        setError(err);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};