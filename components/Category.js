const Category = ({ title, catText, children }) => (
  <div className="category">
    <article className="info">
      <h2>{title}</h2>
      <div className="text" dangerouslySetInnerHTML={{ __html: catText }}></div>
    </article>
    <aside className="players">{children}</aside>
  </div>
);

export default Category;
