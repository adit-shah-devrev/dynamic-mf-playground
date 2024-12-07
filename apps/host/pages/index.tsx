import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import {
  Product,
  ProductsResponse,
  API_ENDPOINTS,
  QUERY_KEYS,
} from '@dynamic-mf-playground/shared-types';
import styles from './index.module.css';

const ProductRecommendations = dynamic(
  () => import('remote1/product-recommendations'),
  {
    loading: () => (
      <div className={styles.loading}>Loading Recommendations...</div>
    ),
  }
);

const ProductReviews = dynamic(() => import('remote2/product-reviews'), {
  loading: () => <div className={styles.loading}>Loading Reviews...</div>,
});

const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(API_ENDPOINTS.PRODUCTS);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export default function Home() {
  const { data, isLoading, error } = useQuery(
    [QUERY_KEYS.PRODUCTS],
    fetchProducts
  );

  if (error) {
    return (
      <div className={styles.error}>
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Featured Products</h1>
        <p className={styles.subtitle}>
          Discover our handpicked selection of premium products
        </p>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading products...</div>
      ) : (
        <div className={styles.productGrid}>
          {data?.products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </p>
                <div className={styles.productMeta}>
                  <div className={styles.rating}>
                    <span className={styles.ratingIcon}>★</span>
                    {product.rating}
                  </div>
                  <span className={styles.stock}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Remote Components */}
      <section>
        <ProductRecommendations />
      </section>

      <section>
        <ProductReviews />
      </section>

      {/* Error Boundary could be added here */}
      {error && (
        <div className={styles.error}>
          An error occurred while loading some components.
        </div>
      )}
    </div>
  );
}
