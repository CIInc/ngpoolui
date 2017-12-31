export interface IPool {
    //id: number;
    name: string;
    apiUrl: string;
    hashRate?: number;
    miners?: number;
    totalHashes?: number;
    lastBlockFoundTime?: Date;
    lastBlockFound?: number;
    totalBlocksFound?: number;
    totalMinersPaid?: number;
    totalPayments?: number;
    roundHashes?: number;
    poolList?: string;
}
