export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

// API Response types
export interface ProductsResponse {
  products: Product[];
  totalCount: number;
}

export interface ReviewsResponse {
  reviews: Review[];
  totalCount: number;
}
