import React, { useState } from "react";
import { useCreateProductMutation } from "../Redux/Api/ProductApi";
import axios from "axios";

const CreateProduct = () => {
  // State variables to store form data
  const [name, setProductName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [price, setPrice] = useState("");
  //const [colors, setColors] = useState([{ name: "", sizes: [{ size: "", stock: "" }] }]);
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [photoPrev, setPhotoPrev] = useState("");

  const [createProduct, { isLoading, isError }] = useCreateProductMutation();
  const deletehandler=async()=>{
    try {
      axios.delete(`http://localhost:400/api/v1/product`)
    } catch (error) {
      
    }
  }

  // Handler functions to update state when input values change
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const changeImageHandler = (e) => {
    const file= e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // const handleColorNameChange = (index, e) => {
  //   const newColors = [...colors];
  //   newColors[index].name = e.target.value;
  //   setColors(newColors);
  // };

  // const handleSizeChange = (colorIndex, sizeIndex, e) => {
  //   const newColors = [...colors];
  //   newColors[colorIndex].sizes[sizeIndex].size = e.target.value;
  //   setColors(newColors);
  // };

  // const handleStockChange = (colorIndex, sizeIndex, e) => {
  //   const newColors = [...colors];
  //   newColors[colorIndex].sizes[sizeIndex].stock = e.target.value;
  //   setColors(newColors);
  // };

  // // Function to add a new color
  // const addColor = () => {
  //   setColors([...colors, { name: "", sizes: [{ size: "", stock: "" }] }]);
  // };

  // // Function to add a new size for a specific color
  // const addSize = (colorIndex) => {
  //   const newColors = [...colors];
  //   newColors[colorIndex].sizes.push({ size: "", stock: "" });
  //   setColors(newColors);
  // };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!name || !price || stock < 0 || !category || !photo) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);
    // colors.forEach((color, index) => {
    //   formData.set(`colors[${index}][name]`, color.name);
    //   color.sizes.forEach((size, sizeIndex) => {
    //     formData.set(`colors[${index}][sizes][${sizeIndex}][size]`, size.size);
    //     formData.set(`colors[${index}][sizes][${sizeIndex}][stock]`, size.stock);
    //   });
    // });

  

    // Dispatch the createProduct mutation
    await createProduct(formData )
  };

  return (
    <div style={{marginTop:"100px"}}>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" value={name} onChange={handleProductNameChange} />
        </label>
        <br />
          <input type="file" onChange={changeImageHandler} />
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={handlePriceChange} />
        </label>
        <br />
        {/* {colors.map((color, colorIndex) => (
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
               
              </div>
            ))}
            <button type="button" onClick={() => addSize(colorIndex)}>Add Size</button>
          </div>
        ))} */
        <label>
        Stock:
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </label>}
        {/* <button type="button" onClick={addColor}>Add Color</button> */}
        <br />
        <label>
          Overall Stock:
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
        </label>
        <br />
        <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} />
        <button type="submit">Create Product</button>
        {photoPrev && <img src={photoPrev} alt="New Image" />}
      </form>
    </div>
  );
};

export default CreateProduct;
