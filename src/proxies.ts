import type { Component } from 'vue';

import type { ProxyType, WireproxyConfig } from './types';

import HTTPProxy from './components/proxy/HTTPProxy.vue';
import HTTPSProxy from './components/proxy/HTTPSProxy.vue';
import SNIProxy from './components/proxy/SNIProxy.vue';
import SOCKSProxy from './components/proxy/SOCKSProxy.vue';
import STDIOTunnel from './components/proxy/STDIOTunnel.vue';
import TCPClientTunnel from './components/proxy/TCPClientTunnel.vue';
import TCPServerTunnel from './components/proxy/TCPServerTunnel.vue';

interface ProxyItem<T extends ProxyType> {
  label: string;
  component: Component;
  defaults: WireproxyConfig[T][number];
}

export const proxyRegistry = {
  tcpClient: {
    label: 'TCP Client Tunnel',
    component: TCPClientTunnel,
    defaults: {
      bind: '',
      target: '',
    },
  },
  tcpServer: {
    label: 'TCP Server Tunnel',
    component: TCPServerTunnel,
    defaults: {
      target: '',
      port: 9876,
    },
  },
  stdio: {
    label: 'STDIO Tunnel',
    component: STDIOTunnel,
    defaults: {
      target: '',
    },
  },
  socks: {
    label: 'SOCKS5 Proxy',
    component: SOCKSProxy,
    defaults: {
      bind: '',
    },
  },
  http: {
    label: 'HTTP Proxy',
    component: HTTPProxy,
    defaults: {
      bind: '',
    },
  },
  https: {
    label: 'HTTPS Proxy',
    component: HTTPSProxy,
    defaults: {
      bind: '',
      certFile: '',
      keyFile: '',
    },
  },
  sni: {
    label: 'SNI Proxy',
    component: SNIProxy,
    defaults: {
      bind: '',
    },
  },
} satisfies { [K in ProxyType]: ProxyItem<K> };
