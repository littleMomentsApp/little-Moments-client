function ProductCard({
  title,
  imageURL,
  description,
  quantity,
  category,
  price,
  _id,
}) {
  return (
    <div className="ProductCard">
      <img src={imageURL} alt="product-alt" />
      <h3>{title}</h3>
      <p>{description}</p>
      <h4>Quantity: {quantity}</h4>
      <p>{category}</p>
      <h4>Price: {price}$ </h4>
    </div>
  );
}

export default ProductCard;
