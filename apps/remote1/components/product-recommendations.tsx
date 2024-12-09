import { useQuery } from '@tanstack/react-query';
import {
  ProductsResponse,
  QUERY_KEYS,
} from '@dynamic-mf-playground/shared-types';
import styles from './product-recommendations.module.css';

const ProductRecommendations = () => {
  // This will use the cached data from host if available
  const { data, isLoading, error } = useQuery<ProductsResponse, Error>(
    [QUERY_KEYS.PRODUCTS]
    // No fetch function needed here - it will use the cached data
    // If cache is empty, it will use the fetch function from the host
  );

  if (isLoading) {
    return <div className={styles.loading}>Loading recommendations...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error.message}</div>;
  }

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
