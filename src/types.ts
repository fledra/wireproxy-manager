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

export interface WireproxyConfig {
  tcpClient: TCPClientTunnel[];
  tcpServer: TCPServerTunnel[];
  stdio: STDIOTunnel[];
  socks: SOCKS5Proxy[];
  http: HTTPProxy[];
  https: HTTPSProxy[];
  sni: SNIProxy[];
}

export type ProxyType = keyof WireproxyConfig;
export type ProxyConfig<T extends ProxyType = ProxyType> = WireproxyConfig[T][number];

export interface ProxyInstance<T extends ProxyType = ProxyType> {
  id: string;
  type: T;
  config: ProxyConfig<T>;
}

export interface WireproxyInstance {
  id: string;
  config: WireproxyConfig;
}
