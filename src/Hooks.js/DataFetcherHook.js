import { useEffect, useState } from "react";
import axios from "axios";

const DataFetchHook = (url, params, token) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${url}${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setIsLoading(false);
        return setData(response.data);
      });
    window.scrollTo(0, 0);
  }, [url, params, token]);

  return { data, isLoading };
};

export default DataFetchHook;
