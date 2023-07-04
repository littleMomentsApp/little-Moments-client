function ProductCard({ title, image, description, category, price, _id }) {
  return (
    <div className="ProductCard">
      <h3>{title}</h3>
      <img src={image} alt="product-alt" />
      <p>{description}</p>
      <p>{category}</p>
      <h4>Price: {price}$ </h4>
    </div>
  );
}

export default ProductCard;