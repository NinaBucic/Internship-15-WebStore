import { ProductCategories } from "./productCategories";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ProductCategories;
  image: string;
}
