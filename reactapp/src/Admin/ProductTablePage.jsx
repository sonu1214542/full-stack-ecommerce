import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchProductsQuery } from "../Redux/Api/ProductApi";
import axios from "axios";
import "./ProductTable.css";

const ProductTablePage = () => {
  const [page, setPage] = useState("1");
  const { data, error, isLoading } = useSearchProductsQuery({
    search: "",
    page,
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data && data.success) {
      setProducts(data.products || []);
    }
  }, [data]);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/product/deleteproduct/${id}`
      );
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Product Table</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>s.no</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Price</th>
              <th>Colors</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{parseInt(page - 1) * 12 + parseInt(index) + 1}</td>
                <td>
                  <img
                    src={`http://localhost:4000/${product.photo}`}
                    alt={product.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  {product.colors.map((color, colorIndex) => (
                    <div key={colorIndex}>
                      <strong>{color.name}:</strong>{" "}
                      {color.sizes.map((size, sizeIndex) => (
                        <span key={sizeIndex}>
                          {size.size} ({size.stock})
                        </span>
                      ))}
                    </div>
                  ))}
                </td>
                <td>
                  <Link to={`/updateproduct/${product._id}`}>
                    <button className="update-button">Update Product</button>
                  </Link>
                  <br />
                  <button
                    className="delete-button"
                    onClick={() => deleteHandler(product._id)}
                  >
                    Delete Product
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <input
        type="text"
        value={page}
        placeholder="page"
        onChange={(e) => setPage(e.target.value)}
      />
    </div>
  );
};

export default ProductTablePage;
