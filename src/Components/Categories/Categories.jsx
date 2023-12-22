import DataFetchHook from "../../Hooks.js/DataFetcherHook";
import "./Categories.css";
function Categories() {
  const { data } = DataFetchHook(
    `https://api.blog.redberryinternship.ge/api/categories`,
    "",
    ""
  );

  // const test = () => {
  //   let categoryId = [4, 2, 8, 55];
  //   let blogId = [
  //     {
  //       title: "Blog title1",
  //       categories: [
  //         {
  //           id: 1,
  //           name: "Category name",
  //         },
  //         {
  //           id: 11,
  //           name: "Category name2",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Blog title2",
  //       categories: [
  //         {
  //           id: 2,
  //           name: "Category name",
  //         },
  //         {
  //           id: 3,
  //           name: "Category name2",
  //         },
  //         {
  //           id: 1,
  //           name: "Category name2",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Blog title3",
  //       categories: [
  //         {
  //           id: 4,
  //           name: "Category name",
  //         },
  //         {
  //           id: 5,
  //           name: "Category name2",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Blog title4",
  //       categories: [
  //         {
  //           id: 44,
  //           name: "Category name",
  //         },
  //         {
  //           id: 55,
  //           name: "Category name2",
  //         },
  //       ],
  //     },
  //   ];

  //   let filteredBlogs = blogId.filter((blog) => {
  //     return categoryId.some((categoryIdItem) => {
  //       return blog.categories.some(
  //         (blogCategory) => blogCategory.id === categoryIdItem
  //       );
  //     });
  //   });

  //   console.log(filteredBlogs);
  // };
  return (
    <ul className="categories_list">
      {data.data?.map((item) => {
        return (
          <li
            style={{
              color: item.text_color,
              background: item.background_color,
            }}
            key={item.id}
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
}

export default Categories;
