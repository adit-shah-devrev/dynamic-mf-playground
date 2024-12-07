import type { NextApiRequest, NextApiResponse } from 'next';
import {
  Product,
  ProductsResponse,
  ApiError,
} from '@dynamic-mf-playground/shared-types';

const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Electronics',
    description: 'High-quality wireless headphones with noise cancellation',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 299.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
    category: 'Electronics',
    description: 'Advanced smartwatch with health monitoring features',
    inStock: true,
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    category: 'Clothing',
    description: 'Comfortable 100% organic cotton t-shirt',
    inStock: true,
  },
  {
    id: '4',
    name: 'Coffee Maker Deluxe',
    price: 159.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1517080317843-0b926a6ce350?w=400',
    category: 'Home & Kitchen',
    description: 'Programmable coffee maker with built-in grinder',
    inStock: false,
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    price: 49.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    category: 'Sports & Fitness',
    description: 'Extra thick eco-friendly yoga mat with carrying strap',
    inStock: true,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductsResponse | ApiError>
) {
  try {
    res.status(200).json({
      products,
      totalCount: products.length,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      code: 'PRODUCTS_FETCH_ERROR',
    });
  }
}
