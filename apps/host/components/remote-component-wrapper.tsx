import { Suspense, lazy, useEffect } from 'react';
import { init, loadRemote } from '@module-federation/runtime';
import { RemoteModule } from '@dynamic-mf-playground/shared-types';

interface RemoteComponentWrapperProps {
  module: RemoteModule;
}

const getRemoteUrl = (url: string) => {
  const isServer = typeof window === 'undefined';
  const location = isServer ? 'ssr' : 'chunks';
  return `${url}/_next/static/${location}/remoteEntry.js`;
};

const RemoteComponentWrapper = ({ module }: RemoteComponentWrapperProps) => {
  // Lazy load the remote component
  const RemoteComponent = lazy(() => {
    // Initialize federation runtime
    init({
      name: 'host',
      remotes: [
        {
          name: module.scope,
          entry: getRemoteUrl(module.url),
        },
      ],
    });

    // Import the remote component
    return loadRemote(module.scope + '/' + module.module);
  });

  useEffect(() => {
    console.log(`Loading remote module: ${module.name}`);
  }, [module]);

  return (
    <Suspense fallback={<div>Loading {module.name}...</div>}>
      <RemoteComponent />
    </Suspense>
  );
};

export default RemoteComponentWrapper;
