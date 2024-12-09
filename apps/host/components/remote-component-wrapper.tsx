import { Suspense, lazy } from 'react';
import { init, loadRemote } from '@module-federation/runtime';

interface RemoteComponentWrapperProps {
  url: string;
  scope: string;
  module: string;
}

const getRemoteUrl = (url: string) => {
  const isServer = typeof window === 'undefined';
  const location = isServer ? 'ssr' : 'chunks';
  return `${url}/_next/static/${location}/remoteEntry.js`;
};

const RemoteComponentWrapper = ({
  url,
  scope,
  module,
}: RemoteComponentWrapperProps) => {
  // Lazy load the remote component
  const RemoteComponent = lazy(() => {
    // Initialize federation runtime
    init({
      name: 'host',
      remotes: [
        {
          name: scope,
          entry: getRemoteUrl(url),
        },
      ],
    });

    // Import the remote component
    return loadRemote(scope + '/' + module);
  });

  return (
    <Suspense fallback={<div>Loading remote component...</div>}>
      <RemoteComponent />
    </Suspense>
  );
};

export default RemoteComponentWrapper;
