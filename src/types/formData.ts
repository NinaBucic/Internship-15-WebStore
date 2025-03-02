import { ProductCategories } from "./productCategories";

export interface FormData {
  title: string;
  price: string;
  description: string;
  category: ProductCategories | "";
  image: string;
}
