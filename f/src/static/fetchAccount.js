// hooks/useFetchAccount.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchAccount() {
  const [acc, setAcc] = useState(null);
  const [error, setError] = useState(null);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:8000/verify")
      .then(res => {
        if (res.data.Status === "Success") { 
          const verified = res.data.data;
          axios.get(`http://localhost:8000/user/`+verified.userID)
          .then(res => {
              if (res.data.Status === "Success"){
                const fetchedacc = res.data.data[0];
                setAcc(fetchedacc);
              }
          });
        }
      })
      .catch(e => {
        setError(e);
        console.log(e);
      });
  }, []);

  return { acc, error };
};
