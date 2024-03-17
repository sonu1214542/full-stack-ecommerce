import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { productid } = useParams();
  const [name, setProductName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [price, setPrice] = useState("");
  const [colors, setColors] = useState([{ name: "", sizes: [{ size: "", stock: "" }] }]);
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [photoPrev, setPhotoPrev] = useState("");


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/product/getsingleproduct/${productid}`
        );
        const product = response.data;
        console.log(product)
        console.log(product.message.name)
        setProductName(product.message.name);
        setCategory(product.message.category);
        setColors(product.message.colors);
        setPrice(product.message.price);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productid]);


  console.log(colors)


  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleColorNameChange = (index, e) => {
    const newColors = [...colors];
    newColors[index].name = e.target.value;
    setColors(newColors);
  };

  const handleSizeChange = (colorIndex, sizeIndex, e) => {
    const newColors = [...colors];
    newColors[colorIndex].sizes[sizeIndex].size = e.target.value;
    setColors(newColors);
  };

  const handleStockChange = (colorIndex, sizeIndex, e) => {
    const newColors = [...colors];
    newColors[colorIndex].sizes[sizeIndex].stock = e.target.value;
    setColors(newColors);
  };

  // Function to add a new color
  const addColor = () => {
    console.log("Adding color");
    console.log("Current colors state:", colors);
    setColors([...colors, { name: "", sizes: [{ size: "", stock: "" }] }]);
  };
  

  // Function to add a new size for a specific color
  const addSize = (colorIndex) => {
    const newColors = [...colors];
    newColors[colorIndex].sizes.push({ size: "", stock: "" });
    setColors(newColors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!name || !price || stock < 0 || !category || !photo) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("category", category);
    colors.forEach((color, index) => {
      formData.set(`colors[${index}][name]`, color.name);
      color.sizes.forEach((size, sizeIndex) => {
        formData.set(`colors[${index}][sizes][${sizeIndex}][size]`, size.size);
        formData.set(
          `colors[${index}][sizes][${sizeIndex}][stock]`,
          size.stock
        );
      });
    });

    if (photo) {
      formData.append("photo", photo);

      // Dispatch the createProduct mutation
    //   await createProduct(formData);
    }

    try {
      await axios.put(
        `http://localhost:4000/api/v1/product/updateproduct/${productid}`,
        formData
      );
      alert("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleProductNameChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <label>
        Price:
        <input type="number" value={price} onChange={handlePriceChange} />
      </label>

      <br />
      {colors &&colors.map((color, colorIndex) => (
        <div key={colorIndex}>
          <label>
            Color Name:
            <input
              type="text"
              value={color.name}
              onChange={(e) => handleColorNameChange(colorIndex, e)}
            />
          </label>
          {color.sizes.map((size, sizeIndex) => (
            <div key={sizeIndex}>
              <label>
                Size:
                <input
                  type="text"
                  value={size.size}
                  onChange={(e) => handleSizeChange(colorIndex, sizeIndex, e)}
                />
              </label>
              <label>
                Stock:
                <input
                  type="number"
                  value={size.stock}
                  onChange={(e) => handleStockChange(colorIndex, sizeIndex, e)}
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={() => addSize(colorIndex)}>
            Add Size
          </button>
        </div>
      ))}
      <button type="button" onClick={addColor}>
        Add Color
      </button>
      <br />

      {/* Other input fields */}
      <div>
        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={handlePhotoChange}
        />
        <label>
          Price:
          <input type="number" value={price} onChange={handlePriceChange} />
        </label>
      </div>
      <button type="submit" >
        Update Product
      </button>
    </form>
  );
};

export default UpdateProduct;
