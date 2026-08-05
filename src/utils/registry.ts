import type { Component } from 'vue';

import type { ProxyType } from '../types.ts';

import HTTPProxy from '../components/proxy/HTTPProxy.vue';
import HTTPSProxy from '../components/proxy/HTTPSProxy.vue';
import SNIProxy from '../components/proxy/SNIProxy.vue';
import SOCKSProxy from '../components/proxy/SOCKSProxy.vue';
import STDIOTunnel from '../components/proxy/STDIOTunnel.vue';
import TCPClientTunnel from '../components/proxy/TCPClientTunnel.vue';
import TCPServerTunnel from '../components/proxy/TCPServerTunnel.vue';

export const proxyRegistry = {
  TCPClientTunnel: {
    label: 'TCP Client Tunnel',
    component: TCPClientTunnel,
  },
  TCPServerTunnel: {
    label: 'TCP Server Tunnel',
    component: TCPServerTunnel,
  },
  STDIOTunnel: {
    label: 'STDIO Tunnel',
    component: STDIOTunnel,
  },
  Socks5: {
    label: 'SOCKS5 Proxy',
    component: SOCKSProxy,
  },
  http: {
    label: 'HTTP Proxy',
    component: HTTPProxy,
  },
  https: {
    label: 'HTTPS Proxy',
    component: HTTPSProxy,
  },
  SNI: {
    label: 'SNI Proxy',
    component: SNIProxy,
  },
} satisfies Record<ProxyType, { label: string; component: Component }>;
