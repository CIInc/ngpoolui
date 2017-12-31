import { Pool } from './pool';

export class Pools {
    static Default(): Pool[] {
        return [
        {
          name: 'XMRPool.net',
          webUrl: 'https://xmrpool.net',
          apiUrl: 'https://api.xmrpool.net',
          hashRate: 0,
          miners: 0,
          totalHashes: 0,
          lastBlockFoundTime: null
        },
        {
          name: 'supportXMR.com',
          webUrl: 'https://supportxmr.com',
          apiUrl: 'https://supportxmr.com/api',
          hashRate: 0,
          miners: 0,
          totalHashes: 0,
          lastBlockFoundTime: null
        },
        {
          name: 'ViaXMR.com',
          webUrl: 'https://viaxmr.com',
          apiUrl: 'https://api.viaxmr.com',
          hashRate: 0,
          miners: 0,
          totalHashes: 0,
          lastBlockFoundTime: null
        },
        {
          name: 'Moria Mining Pool',
          webUrl: 'https://moriaxmr.com',
          apiUrl: 'https://api.moriaxmr.com',
          hashRate: 0,
          miners: 0,
          totalHashes: 0,
          lastBlockFoundTime: null
        },
        {
          name: 'Monero Ocean',
          webUrl: 'https://moneroocean.stream',
          apiUrl: 'https://api.moneroocean.stream',
          hashRate: 0,
          miners: 0,
          totalHashes: 0,
          lastBlockFoundTime: null
        },
      ];
    }
}
