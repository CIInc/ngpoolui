export class Pool {
    id: number; // needed for cdk table sorts?!
    name: string;
    webUrl: string;
    apiUrl: string;
    hashRate: number;
    miners: number;
    totalHashes: number;
    lastBlockFoundTime: Date;
    lastBlockFound?: number;
    totalBlocksFound?: number;
    totalMinersPaid?: number;
    totalPayments?: number;
    roundHashes?: number;
    poolList?: string;
    //constructor() {}
    /*
    constructor(name: string, apiUrl: string) {
        this.name = name;
        this.apiUrl = apiUrl;
    }
    */
  }
