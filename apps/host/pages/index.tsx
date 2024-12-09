import { useState } from 'react';
import RemoteComponentWrapper from '../components/remote-component-wrapper';
import styles from './index.module.css';

const remoteConfigs = [
  {
    name: 'Product Recommendations',
    url: 'http://localhost:3001',
    scope: 'remote1',
    module: 'product-recommendations',
  },
  {
    name: 'Product Reviews',
    url: 'http://localhost:3002',
    scope: 'remote2',
    module: 'product-reviews',
  },
];

export default function Home() {
  const [selectedRemote, setSelectedRemote] = useState(remoteConfigs[0]);

  return (
    <div className={styles.container}>
      <h1>Dynamic Remote Loading Demo</h1>

      <div className={styles.controls}>
        <select
          value={selectedRemote.name}
          onChange={(e) => {
            const config = remoteConfigs.find((c) => c.name === e.target.value);
            if (config) setSelectedRemote(config);
          }}
        >
          {remoteConfigs.map((config) => (
            <option key={config.name} value={config.name}>
              {config.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.remoteContainer}>
        <RemoteComponentWrapper
          url={selectedRemote.url}
          scope={selectedRemote.scope}
          module={selectedRemote.module}
        />
      </div>
    </div>
  );
}
