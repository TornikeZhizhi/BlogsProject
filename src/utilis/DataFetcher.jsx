import axios from "axios";
import { useEffect, useState } from "react";

const DataFetcher = (url, token) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Axios error:", error);
      }
    };

    fetchData();
  }, [url, token]);

  return { data };
};

export default DataFetcher;
