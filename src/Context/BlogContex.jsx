import { createContext } from "react";
import DataFetchHook from "../Hooks.js/DataFetcherHook";

export const BlogTheme = createContext();
// 66223d7638f7e79cdc963eb612df14c26c16f20719eaa99e031818899305a539
const BlogContext = (props) => {
  const { data } = DataFetchHook(
    `https://api.blog.redberryinternship.ge/api/blogs`,
    "",
    "66223d7638f7e79cdc963eb612df14c26c16f20719eaa99e031818899305a539"
  );
  console.log(data);
  // eslint-disable-next-line react/prop-types
  return <BlogTheme.Provider value={{}}>{props.children}</BlogTheme.Provider>;
};
export default BlogContext;
