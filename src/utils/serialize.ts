import type { ProxyInstance, WireproxyInstance } from '../types';

export function serializeProxyInstance(instance: ProxyInstance) {
  let config = `[${instance.type}]\n`;
  for (const [key, value] of Object.entries(instance.config)) {
    config += `${key} = ${value}\n`;
  }
  return config.trim();
}

export function serializeWireproxyInstance(instance: WireproxyInstance) {
  let config = `WGConfig = ${instance.wgConfig}\n`;
  for (const proxy of instance.proxies) {
    config += `${serializeProxyInstance(proxy)}\n`;
  }
  return config.trim();
}
