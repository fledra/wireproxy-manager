export interface TCPClientTunnel {
  Target: string;
  BindAddress: string;
}

export interface TCPServerTunnel {
  Target: string;
  Port: number;
}

export interface STDIOTunnel {
  Target: string;
}

export interface SOCKS5Proxy {
  BindAddress: string;
}

export interface HTTPProxy {
  BindAddress: string;
  Username?: string;
  Password?: string;
}

export interface HTTPSProxy {
  BindAddress: string;
  CertFile: string;
  KeyFile: string;
}

export interface SNIProxy {
  BindAddress: string;
}

export type ProxyInstance = {
  id: string;
} & (
  | { type: 'TCPClientTunnel'; config: TCPClientTunnel }
  | { type: 'TCPServerTunnel'; config: TCPServerTunnel }
  | { type: 'STDIOTunnel'; config: STDIOTunnel }
  | { type: 'Socks5'; config: SOCKS5Proxy }
  | { type: 'http'; config: HTTPProxy }
  | { type: 'https'; config: HTTPSProxy }
  | { type: 'SNI'; config: SNIProxy }
);

export type ProxyType = ProxyInstance['type'];
export type ProxyConfig<T extends ProxyType = ProxyType> = Extract<ProxyInstance, { type: T }>['config'];

export interface WireproxyInstance {
  id: string;
  name?: string;
  running: boolean;
  wgConfigPath: string;
  wireproxyPath: string;
  proxies: ProxyInstance[];
}
