import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBlogs } from "../../context/BlogContextProvider";
import DataFetcher from "../../utilis/DataFetcher";
import styles from "./Categories.module.css";

const BASE_URL = "https://api.blog.redberryinternship.ge/api/categories";

function Categories() {
  const [categoryId, setCategoryId] = useState([]);
  const { filterHandler } = useBlogs();
  const { data } = DataFetcher(BASE_URL);
  // console.log(blogsList);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const urlParams = [];

    for (let i = 1; i <= 12; i++) {
      const categoryId = queryParams.get(`categoryId${i}`);

      if (categoryId !== null) {
        urlParams.push(Number(categoryId));
      }
    }
    setCategoryId(urlParams);
  }, []);

  function handlerId(id) {
    setCategoryId((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((existingId) => existingId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  }
  useEffect(() => {
    const queryString = categoryId
      .map((id, index) => `categoryId${index + 1}=${id}`)
      .join("&");

    navigate({
      pathname: "/",
      search: `${queryString}`,
    });
    filterHandler(categoryId);
  }, [categoryId]);

  return (
    <ul className={styles.category_box}>
      {data.data?.map((category) => (
        <li
          onClick={() => handlerId(category.id)}
          className={styles.category_list}
          style={{
            backgroundColor: `${category.background_color}`,
          }}
          key={category.id}
        >
          <p style={{ color: category.text_color }}>{category.title} </p>
        </li>
      ))}
    </ul>
  );
}

export default Categories;
