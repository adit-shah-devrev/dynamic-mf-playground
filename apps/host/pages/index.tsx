import { useQuery } from '@tanstack/react-query';
import { useConfiguration } from '../contexts/configuration-context';
import RemoteComponentWrapper from '../components/remote-component-wrapper';
import {
  ProductsResponse,
  QUERY_KEYS,
  API_ENDPOINTS,
} from '@dynamic-mf-playground/shared-types';
import styles from './index.module.css';

const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(API_ENDPOINTS.PRODUCTS);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export default function Home() {
  // Configuration context for dynamic remotes
  const {
    configs,
    isLoading: configLoading,
    error: configError,
    selectedConfigId,
    setSelectedConfigId,
  } = useConfiguration();

  // Products query with proper error typing
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery<ProductsResponse, Error>([QUERY_KEYS.PRODUCTS], fetchProducts);

  if (configLoading || productsLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>Loading...</p>
      </div>
    );
  }

  if (configError || productsError) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error Loading Data</h2>
        <p>{(configError || productsError)?.message || 'An error occurred'}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Retry
        </button>
      </div>
    );
  }

  const selectedConfig = configs?.find(
    (config) => config.id === selectedConfigId
  );

  return (
    <div className={styles.container}>
      {/* Products Section */}
      <section className={styles.productsSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>Featured Products</h1>
          <p className={styles.subtitle}>
            Discover our handpicked selection of premium products
          </p>
        </div>

        <div className={styles.productGrid}>
          {productsData?.products.map((product) => (
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
      </section>

      {/* Dynamic Remotes Section */}
      <section className={styles.remotesSection}>
        <div className={styles.controls}>
          <div className={styles.selectWrapper}>
            <select
              value={selectedConfigId || ''}
              onChange={(e) => setSelectedConfigId(e.target.value)}
              className={styles.select}
            >
              <option value="">Select a configuration</option>
              {configs?.map((config) => (
                <option key={config.id} value={config.id}>
                  {config.name}
                </option>
              ))}
            </select>
          </div>
          {selectedConfig && (
            <div className={styles.configInfo}>
              <p className={styles.configDescription}>
                {selectedConfig.description}
              </p>
              <span className={styles.moduleCount}>
                {selectedConfig.modules.length} module(s)
              </span>
            </div>
          )}
        </div>

        {selectedConfig && (
          <div className={styles.modulesGrid}>
            {selectedConfig.modules.map((module) => (
              <div key={module.scope} className={styles.moduleCard}>
                <div className={styles.moduleHeader}>
                  <h3 className={styles.moduleName}>{module.name}</h3>
                  <span className={styles.moduleScope}>{module.scope}</span>
                </div>
                <div className={styles.moduleContent}>
                  <RemoteComponentWrapper module={module} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
