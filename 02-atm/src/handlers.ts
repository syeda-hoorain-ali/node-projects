import chalk from "chalk";
import inquirer from "inquirer";
import { validateAmount, validateAccount } from "./validation.js"


//* Function to handle withdraw
export const handleWithdraw = async (balance: number) => {
    const { amount } = await inquirer.prompt({
        message: chalk.cyan("Enter the amount you like to withdraw: "),
        name: "amount",
        type: "input",
        validate: validateAmount
    });
    if (parseFloat(amount) > balance) { return undefined; }
    balance -= parseFloat(amount);
    return `Transaction successful. Withdrawn ${amount.trim()}. Updated balance: ${balance}.`;
}


//* Function to handle deposit
export const handleDeposit = async (balance: number) => {
    const { amount } = await inquirer.prompt({
        message: chalk.magenta("Enter the amount you like to deposit: "),
        name: "amount",
        type: "input",
        validate: validateAmount
    });
    balance += parseFloat(amount);
    return `Transaction successful. Deposited ${amount.trim()}. Updated balance: ${balance}.`;
}


//* Function to handle amount transfer to another account
export const handleTransfer = async (balance: number) => {
    const { account, amount } = await inquirer.prompt([
        {
            message: chalk.magenta("Enter 11 digit account number you want to transfer to: "),
            name: "account",
            type: "input",
            validate: validateAccount
        },
        {
            message: chalk.cyan("Enter the amount you like to transfer: "),
            name: "amount",
            type: "input",
            validate: validateAmount
        },
    ]);

    if (parseFloat(amount) > balance) return undefined;
    balance -= parseFloat(amount);
    return `Transaction successful. Transferred ${amount.trim()} to ${account.trim()}. Updated balance: ${balance}.`;
}


//* Function to handle inquiry
export const handleInquiry = (balance: number) => {
    return `Transaction successful. Balance: ${balance}.`;
}


//* Function to handle all transitions
export const handleTransition = async (transition: string, balance: number) => {
    let message;
    switch (transition) {
        case "Withdraw":
            message = await handleWithdraw(balance);
            break;

        case "Deposit":
            message = await handleDeposit(balance);
            break;

        case "Transfer":
            message = await handleTransfer(balance);
            break;

        case "Inquiry":
            message = handleInquiry(balance);
            break;
    }
    return message
}

