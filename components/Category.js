const Category = ({ title, catText, children }) => (
  <div className="category">
    <article className="info">
      <h3>{title}</h3>
      <div className="text" dangerouslySetInnerHTML={{ __html: catText }}></div>
    </article>
    {children}
  </div>
);

export default Category;
