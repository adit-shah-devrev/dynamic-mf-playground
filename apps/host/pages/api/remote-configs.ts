import { NextApiRequest, NextApiResponse } from 'next';
import {
  RemoteConfig,
  RemoteConfigResponse,
} from '@dynamic-mf-playground/shared-types';

const MOCK_CONFIGS: RemoteConfig[] = [
  {
    id: 'config1',
    name: 'Basic Setup',
    description: 'Default configuration with product recommendations',
    modules: [
      {
        name: 'Product Recommendations',
        scope: 'remote1',
        module: 'product-recommendations',
        url: 'http://localhost:3001',
      },
    ],
  },
  {
    id: 'config2',
    name: 'Full Setup',
    description: 'Complete setup with all available modules',
    modules: [
      {
        name: 'Product Recommendations',
        scope: 'remote1',
        module: 'product-recommendations',
        url: 'http://localhost:3001',
      },
      {
        name: 'Product Reviews',
        scope: 'remote2',
        module: 'product-reviews',
        url: 'http://localhost:3002',
      },
    ],
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RemoteConfigResponse>
) {
  // Simulate API delay
  setTimeout(() => {
    try {
      // Randomly throw error for demonstration
      if (Math.random() < 0.1) {
        throw new Error('Random API error');
      }
      res.status(200).json({ configs: MOCK_CONFIGS });
    } catch (error) {
      res
        .status(500)
        .json({ configs: [], error: 'Failed to fetch configurations' });
    }
  }, 1000);
}
