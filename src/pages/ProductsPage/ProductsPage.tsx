import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../../types/product";
import { fetchProducts } from "../../api/fakeStoreApi";
import {
  Box,
  TextField,
  MenuItem,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { ProductCategories } from "../../types/productCategories";
import ProductCard from "../../components/ProductCard/ProductCard.tsx";
import "./ProductsPage.css";
import { useNavigate } from "react-router-dom";

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const storedProducts: Product[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    fetchProducts()
      .then((data) => {
        setProducts([...storedProducts, ...data]);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    return filtered;
  }, [searchTerm, category, products]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCategory(e.target.value);
    },
    []
  );

  const handleCardClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="products-page">
      <h1>PRODUCTS</h1>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="500px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <TextField
              label="Search products"
              name="searchfilter"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: 300 }}
            />
            <TextField
              id="category-field"
              sx={{ width: 300 }}
              select
              label="Category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
              variant="outlined"
            >
              <MenuItem value="">All</MenuItem>
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
          </Box>
          <Grid2 container spacing={3} sx={{ marginTop: 5 }}>
            {filteredProducts.slice(0, 20).map((product) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <ProductCard product={product} onClick={handleCardClick} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}
    </div>
  );
};

export default ProductsPage;
