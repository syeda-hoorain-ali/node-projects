import type ITransaction from "./ITransactions.js";

class Bank {

    private _accountNo: number;
    private _balance: number = 10000;
    private _tax: number = 1; // Percent
    private _limit: number = 25000;
    private _transactions: ITransaction[] = [];

    constructor() {
        this._accountNo = this.getAccountNo();
    }

    private getAccountNo () {
        let number = Math.floor(Math.random() * 100000);
        return number
    }

    //* Deposit
    public deposit(amount: number) {
        if (amount > this._limit) {
            this._transactions.push({
                account: this._accountNo,
                type: 'deposit',
                successful: false,
                balance: this._balance,
                amount,
                createdAt: new Date()
            })
            return { success: false, message: 'Out of limit' };
        }

        this._balance += amount;
        this._transactions.push({
            account: this._accountNo,
            type: 'deposit',
            successful: false,
            balance: this._balance,
            amount,
            createdAt: new Date()
        })
        return { success: true, message: `Transaction Successful. Current Balance: ${this._balance}` }

    }

    //* Withdraw
    public withdraw(amount: number) {
        let fees = 0;

        if (amount >= 1000) {
            fees = amount / this._tax;
        }

        if ((amount + fees) > this._balance) {
            this._transactions.push({
                account: this._accountNo,
                type: 'withdraw',
                successful: false,
                balance: this._balance,
                amount,
                fees,
                createdAt: new Date()
            })
            return { success: false, message: 'Insufficient Balance' }
        }

        this._balance -= (amount + fees);

        this._transactions.push({
            account: this._accountNo,
            type: 'withdraw',
            successful: true,
            balance: this._balance,
            amount,
            fees,
            createdAt: new Date()
        })

        return { success: true, message: `Transaction Successful. Current Balance: ${this._balance}` }
    }


    //* Check balance 
    public checkBalance() {
        return this._balance
    }

    //* Get all transactions that are successful
    public getTransactions() {
        return this._transactions.filter(transaction => transaction.successful)
    }

    //* Get Account No
    protected get accountNo() : number {
        return this._accountNo
    }
    
}

export default Bank
