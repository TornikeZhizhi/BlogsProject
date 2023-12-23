import { createContext, useContext, useEffect, useState } from "react";
import DataFetcher from "../utilis/DataFetcher";

export const BlogThemeContext = createContext();

function BlogContextProvider(props) {
  const BASE_URL = "https://api.blog.redberryinternship.ge/api/blogs";
  const token =
    "5e4977d25fb8a029227f395a8d29b694059c94c67d1253b1930c154111b277c1"; // Consider a more secure method for storing tokens

  const { data } = DataFetcher(BASE_URL, token);
  const [blogsList, setBlogsList] = useState(data?.data || []);
  const [urlParams, setUrlParams] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      setBlogsList(data.data);
    }
  }, [data]);

  useEffect(() => {
    const filteredBlogs =
      urlParams.length < 1
        ? data.data
        : data.data?.filter((blog) =>
            urlParams.some((categoryIdItem) =>
              blog.categories.some(
                (blogCategory) => blogCategory.id === categoryIdItem
              )
            )
          );
    setBlogsList(filteredBlogs);
  }, [urlParams, data]);

  const filterHandler = (categoryId) => {
    setUrlParams(categoryId);
  };

  return (
    <BlogThemeContext.Provider value={{ blogsList, filterHandler }}>
      {props.children}
    </BlogThemeContext.Provider>
  );
}

function useBlogs() {
  const context = useContext(BlogThemeContext);
  if (!context)
    throw new Error("useBlogs must be used within a BlogContextProvider");
  return context;
}

export { BlogContextProvider, useBlogs };
