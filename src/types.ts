export interface TCPClientTunnel {
  target: string;
  bind: string;
}

export interface TCPServerTunnel {
  target: string;
  port: number;
}

export interface STDIOTunnel {
  target: string;
}

export interface SOCKS5Proxy {
  bind: string;
}

export interface HTTPProxy {
  bind: string;
  username?: string;
  password?: string;
}

export interface HTTPSProxy {
  bind: string;
  certFile: string;
  keyFile: string;
}

export interface SNIProxy {
  bind: string;
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
