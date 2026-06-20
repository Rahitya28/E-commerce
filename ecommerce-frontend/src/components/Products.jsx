import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Products({ token }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    // Only fetch if authenticated (though our backend currently doesn't enforce it, the frontend can assume it)
    if (token) {
      fetch("http://localhost:5000/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Failed to fetch products", err));
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          (product) => product.category === category
        );

  return (
    <div className="container">
      <h1>Our Products</h1>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="men's clothing">
          Men's Clothing
        </option>
        <option value="women's clothing">
          Women's Clothing
        </option>
        <option value="electronics">
          Electronics
        </option>
        <option value="jewelery">
          Jewelery
        </option>
      </select>

      <div className="product-container">
        {filteredProducts.map((product) => (
          <div className="card" key={product._id || product.id}>
            <img
              src={product.image}
              alt={product.title}
            />

            <h3>{product.title}</h3>

            <p>
              <strong>₹ {product.price}</strong>
            </p>

            <p>{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
