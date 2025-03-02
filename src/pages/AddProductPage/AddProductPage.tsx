import React, { useRef, useState } from "react";
import { FormData } from "../../types/formData";
import { Product } from "../../types/product";
import { ProductCategories } from "../../types/productCategories";
import { toast, Toaster } from "react-hot-toast";
import { Box, TextField, MenuItem, Button } from "@mui/material";
import "./AddProductPage.css";

const initialFormData: FormData = {
  title: "",
  price: "",
  description: "",
  category: "",
  image: "",
};

const AddProductPage: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim() || !/[a-zA-Z]/.test(formData.title.trim())) {
      newErrors.title =
        "Title is required and must contain at least one letter.";
    }
    if (
      !formData.price.trim() ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Price must be a positive number.";
    }
    if (
      !formData.description.trim() ||
      !/[a-zA-Z]/.test(formData.description.trim())
    ) {
      newErrors.description =
        "Description is required and must contain at least one letter.";
    }
    if (!formData.category) {
      newErrors.category = "Category is required.";
    }
    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProduct: Product = {
      id: Date.now(),
      title: formData.title.trim(),
      price: parseFloat(formData.price),
      description: formData.description.trim(),
      category: formData.category as ProductCategories,
      image: formData.image.trim(),
    };

    const existingProducts: Product[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    const updatedProducts = [newProduct, ...existingProducts];
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    toast.success("Product added successfully!");

    setFormData(initialFormData);
    setErrors({});
    formRef.current?.reset();
  };

  return (
    <div className="add-product-page">
      <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
        <h2>Add New Product:</h2>
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            margin="normal"
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            margin="normal"
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            margin="normal"
            error={!!errors.category}
            helperText={errors.category}
          >
            <MenuItem value={ProductCategories.MensClothing}>
              Men's Clothing
            </MenuItem>
            <MenuItem value={ProductCategories.WomensClothing}>
              Women's Clothing
            </MenuItem>
            <MenuItem value={ProductCategories.Jewelery}>Jewelery</MenuItem>
            <MenuItem value={ProductCategories.Electronics}>
              Electronics
            </MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            margin="normal"
            error={!!errors.image}
            helperText={errors.image}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Product
          </Button>
        </form>
        <Toaster />
      </Box>
    </div>
  );
};

export default AddProductPage;
