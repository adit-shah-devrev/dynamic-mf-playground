import { useConfiguration } from '../contexts/configuration-context';
import RemoteComponentWrapper from '../components/remote-component-wrapper';
import styles from './index.module.css';

export default function Home() {
  const { configs, isLoading, error, selectedConfigId, setSelectedConfigId } =
    useConfiguration();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>Loading configurations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error Loading Configurations</h2>
        <p>{error.message}</p>
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
      <header className={styles.header}>
        <h1 className={styles.title}>Dynamic Remote Modules</h1>
        <p className={styles.subtitle}>
          Load and switch between different remote configurations
        </p>
      </header>

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
    </div>
  );
}
