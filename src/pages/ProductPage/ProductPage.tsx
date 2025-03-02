import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../types/product";
import { fetchProducts } from "../../api/fakeStoreApi";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Typography,
} from "@mui/material";
import ProductCard from "../../components/ProductCard/ProductCard";
import noImage from "../../assets/images/no-image.jpg";

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [recommended, setRecommended] = useState<Product[]>([]);

  useEffect(() => {
    if (!productId) return;

    setLoading(true);
    const storedProducts: Product[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    fetchProducts()
      .then((data) => {
        const combinedProducts = [...storedProducts, ...data];
        const foundProduct = combinedProducts.find(
          (p) => p.id === Number(productId)
        );

        if (!foundProduct) {
          navigate("/not-found", { replace: true });
          return;
        }

        setProduct(foundProduct);

        const recommendedItems = combinedProducts
          .filter(
            (p) =>
              p.category === foundProduct.category && p.id !== foundProduct.id
          )
          .slice(0, 4);

        setRecommended(recommendedItems);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  }, [productId, navigate]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="500px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" color="error">
          Product not found.
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Go to Products
        </Button>
      </Box>
    );
  }

  return (
    <div className="product-page">
      <Box sx={{ p: 5 }}>
        <Typography variant="h4" gutterBottom>
          {product.title}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 10 }}>
          <img
            src={product.image}
            onError={(e) => {
              e.currentTarget.src = noImage;
            }}
            alt={product.title}
            style={{ maxWidth: 300, maxHeight: 300, objectFit: "contain" }}
          />
          <Box sx={{ mt: 10 }}>
            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h6">${product.price}</Typography>
          </Box>
        </Box>

        <Typography variant="h5" gutterBottom>
          Maybe you'll like...
        </Typography>
        {recommended.length === 0 ? (
          <Typography>No similar products found.</Typography>
        ) : (
          <Grid2 container spacing={3}>
            {recommended.map((item) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                <ProductCard
                  product={item}
                  onClick={() => navigate(`/product/${item.id}`)}
                />
              </Grid2>
            ))}
          </Grid2>
        )}
      </Box>
    </div>
  );
};

export default ProductPage;
