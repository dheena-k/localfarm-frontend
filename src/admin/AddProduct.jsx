import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !category || !description || !location || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:8080/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data?.status) {
        alert("Product added successfully!");

        // reset form
        setTitle("");
        setPrice("");
        setCategory("");
        setDescription("");
        setLocation("");
        setImage(null);

        // reset file input manually (optional UI fix)
        document.getElementById("imageInput").value = "";
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow border-0">
        <h3>Add Product</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Title"
            className="form-control mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            className="form-control mb-3"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            className="form-control mb-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="form-control mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input
            type="text"
            placeholder="Location"
            className="form-control mb-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            id="imageInput"
            type="file"
            className="form-control mb-3"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;