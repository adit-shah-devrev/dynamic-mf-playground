import {
  RemoteConfig,
  RemoteConfigResponse,
} from '@dynamic-mf-playground/shared-types';

export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export const fetchConfigurations = async (): Promise<RemoteConfig[]> => {
  try {
    const response = await fetch('/api/remote-configs');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: RemoteConfigResponse = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.configs;
  } catch (error) {
    throw new ConfigurationError(
      `Failed to fetch remote configurations: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};

export const validateConfiguration = (config: RemoteConfig): boolean => {
  return (
    !!config.id &&
    !!config.name &&
    Array.isArray(config.modules) &&
    config.modules.every(
      (module) =>
        !!module.name && !!module.scope && !!module.module && !!module.url
    )
  );
};
