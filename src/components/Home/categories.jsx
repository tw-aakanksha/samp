/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import './homepage.css';
const Category = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <div className="category-container">
          <div
            className="background-image"
            style={{ backgroundImage: `url(${category.imageUrl})` }}
          ></div>

          <div className="category-body-container">
            <h1>{category.title}</h1>
            <p>Shop Now</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
