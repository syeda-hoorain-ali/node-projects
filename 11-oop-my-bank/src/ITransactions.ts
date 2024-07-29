interface ITransaction {
    account: number;
    type: 'withdraw' | 'deposit';
    successful: boolean;
    balance: number;
    amount: number;
    fees?: number;
    createdAt: Date;
}



export default  ITransaction;
