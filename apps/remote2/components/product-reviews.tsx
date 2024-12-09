import { useQuery } from '@tanstack/react-query';
import {
  ProductsResponse,
  QUERY_KEYS,
} from '@dynamic-mf-playground/shared-types';
import styles from './product-reviews.module.css';

const ProductReviews = () => {
  // Using the same query key as host and ProductRecommendations
  const { data, isLoading, error } = useQuery<ProductsResponse, Error>(
    [QUERY_KEYS.PRODUCTS]
    // No fetch function needed - will use cached data from host
  );

  if (isLoading) {
    return <div className={styles.loading}>Loading reviews...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error.message}</div>;
  }

  if (!data) return null;

  return (
    <div className={styles.reviews}>
      <h2 className={styles.title}>Latest Reviews</h2>
      <div className={styles.reviewList}>
        {data.products.slice(0, 2).map((product) => (
          <div key={product.id} className={styles.reviewCard}>
            <div className={styles.productInfo}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <h4 className={styles.productName}>{product.name}</h4>
                <div className={styles.rating}>
                  <span className={styles.ratingStars}>
                    {'★'.repeat(Math.round(product.rating))}
                    {'☆'.repeat(5 - Math.round(product.rating))}
                  </span>
                  {product.rating}
                </div>
              </div>
            </div>
            <div className={styles.reviewContent}>
              <p>Sample review for {product.name}...</p>
            </div>
            <div className={styles.reviewMeta}>
              <span className={styles.reviewerName}>John Doe</span>
              <span className={styles.reviewDate}>
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
