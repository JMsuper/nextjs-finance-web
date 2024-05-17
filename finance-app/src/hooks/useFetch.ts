import { useEffect, useState } from 'react';

export default function useFetch(url: string) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((tempData) => {
        setData(tempData);
      })
      .catch((error) => console.error(error));
  }, [url]);

  return data;
}
