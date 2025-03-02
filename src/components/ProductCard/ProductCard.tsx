import React from "react";
import { Product } from "../../types/product";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  onClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={() => onClick(product.id)}>
      <div className="image-container">
        <img
          src={product.image}
          onError={(e) => {
            e.currentTarget.src = "../../assets/images/no-image.jpg";
          }}
          alt={product.title}
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
