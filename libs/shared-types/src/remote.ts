export interface RemoteModule {
  name: string;
  scope: string;
  module: string;
  url: string;
}

export interface RemoteConfig {
  id: string;
  name: string;
  description: string;
  modules: RemoteModule[];
}

export interface RemoteConfigResponse {
  configs: RemoteConfig[];
  error?: string;
}
