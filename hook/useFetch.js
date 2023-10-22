import { useState, useEffect } from 'react';
import axios from 'axios';

const rapidApiKey = process.env.EXPO_PUBLIC_RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  };

  /* Delete */
  // let options = {
  //   method: 'GET',
  //   url: `http://localhost:3000/jobs`,
  // };

  // if (endpoint === 'job-details') {
  //   options = {
  //     method: 'GET',
  //     url: `http://localhost:3000/jobs?job_id=${query.job_id}`,
  //   };
  // }
  /* Delete */

  const fetchData = async () => {
    setisLoading(true);
    console.log('passou');

    try {
      const response = await axios.request(options);
      console.log('data: ', response);
      setData(response.data.data);

      /* Delete */
      // setData(response.data);
      /* Delete */

      setisLoading(false);
    } catch (error) {
      setError(error);
      alert('There is an Error');
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setisLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
