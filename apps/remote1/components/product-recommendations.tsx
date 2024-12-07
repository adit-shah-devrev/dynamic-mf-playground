import { useEffect, useState } from 'react';
import {
  ProductsResponse,
  API_ENDPOINTS,
} from '@dynamic-mf-playground/shared-types';
import styles from './product-recommendations.module.css';

const ProductRecommendations = () => {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.PRODUCTS);
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading)
    return <div className={styles.loading}>Loading recommendations...</div>;
  if (error) return <div className={styles.error}>{error.message}</div>;
  if (!data) return null;

  return (
    <div className={styles.recommendations}>
      <h2 className={styles.title}>Recommended for You</h2>
      <div className={styles.recommendationGrid}>
        {data.products.slice(0, 3).map((product) => (
          <div key={product.id} className={styles.recommendationCard}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.recommendationImage}
            />
            <div className={styles.recommendationInfo}>
              <h4 className={styles.recommendationName}>{product.name}</h4>
              <p className={styles.recommendationDescription}>
                {product.description}
              </p>
              <span className={styles.recommendationPrice}>
                ${product.price.toFixed(2)}
              </span>
              <div className={styles.badge}>Recommended</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
