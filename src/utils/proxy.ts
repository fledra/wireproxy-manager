import type { ProxyInstance, ProxyType } from '../types';

import { nanoid } from 'nanoid';

export function createProxyInstance(type: ProxyType): ProxyInstance {
  const id = nanoid();

  switch (type) {
    case 'TCPClientTunnel':
      return { id, type, config: { BindAddress: '', Target: '' } };
    case 'TCPServerTunnel':
      return { id, type, config: { Port: 0, Target: '' } };
    case 'http':
      return { id, type, config: { BindAddress: '', Username: '', Password: '' } };
    case 'https':
      return { id, type, config: { BindAddress: '', CertFile: '', KeyFile: '' } };
    case 'Socks5':
    case 'SNI':
      return { id, type, config: { BindAddress: '' } };
  }
}

export function getBindAddressPort(bindAddress: string) {
  return Number.parseInt(bindAddress.split(':')[1]);
}

export function getProxyInstancePort(proxy: ProxyInstance): number {
  if (proxy.type === 'TCPServerTunnel') {
    return proxy.config.Port;
  } else {
    return getBindAddressPort(proxy.config.BindAddress);
  }
}
