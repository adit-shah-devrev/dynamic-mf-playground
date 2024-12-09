import { createContext, useContext, ReactNode, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RemoteConfig } from '@dynamic-mf-playground/shared-types';
import { fetchConfigurations } from '../services/config-service';

interface ConfigurationContextState {
  configs: RemoteConfig[] | undefined;
  isLoading: boolean;
  error: Error | null;
  selectedConfigId: string | null;
  setSelectedConfigId: (id: string) => void;
}

const ConfigurationContext = createContext<
  ConfigurationContextState | undefined
>(undefined);

export const ConfigurationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery<RemoteConfig[], Error>(
    ['remoteConfigs'],
    fetchConfigurations,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      onSuccess: (data) => {
        // Select first config by default if none selected
        if (!selectedConfigId && data.length > 0) {
          setSelectedConfigId(data[0].id);
        }
      },
    }
  );

  const value = {
    configs: data,
    isLoading,
    error: error || null,
    selectedConfigId,
    setSelectedConfigId,
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export const useConfiguration = () => {
  const context = useContext(ConfigurationContext);
  if (context === undefined) {
    throw new Error(
      'useConfiguration must be used within a ConfigurationProvider'
    );
  }
  return context;
};
