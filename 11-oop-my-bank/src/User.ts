import inquirer from "inquirer";
import Bank from "./Bank.js";
import chalk from "chalk";
import { printTable, spin, validator } from "./utils.js";

class User extends Bank {

	constructor(
		public firstName: string,
		public lastName: string,
		public age: number,
		public gender: string,
		public phone: number,
	) {
		super()
		console.log(`Welcome ${firstName}, Your account number is ${this.accountNo}`);
	}


	public showInfo() {
		return `${chalk.yellowBright(this.firstName + "'s Info:")}
    ${chalk.magentaBright('Name:')} ${this.firstName} ${this.lastName}
    ${chalk.magentaBright('Age:')} ${this.age}
    ${chalk.magentaBright('Gender:')} ${this.gender}
    ${chalk.magentaBright('Mobile:')} ${this.phone}
    ${chalk.magentaBright('Account Balance :')} ${this.checkBalance()}`
	}


	public async askQuestion() {
		console.log();
		const { userChoice } = await inquirer.prompt({
			name: 'userChoice',
			message: 'What would to like to do?',
			type: 'list',
			choices: ['Withdraw', 'Deposit', 'Inquiry', 'Statement', 'Details', 'Exit']
		})

		switch (userChoice) {
			case 'Withdraw': {
				const { amount } = await inquirer.prompt({
					name: 'amount',
					message: 'Enter amount you want to withdraw:',
					type: 'number',
					validate: validator
				})
				let { message, success } = this.withdraw(amount);
				await spin(message, success);
				break;
			}

			case 'Deposit': {
				const { amount } = await inquirer.prompt({
					name: 'amount',
					message: 'Enter amount you want to deposit:',
					type: 'number',
					validate: validator
				})
				let { message, success } = this.deposit(amount);
				await spin(message, success);
				break;
			}

			case 'Inquiry': {
				let balance = this.checkBalance()
				await spin(`Transaction Successful. Current Balance: ${balance}`, true);
				break;
			}

			case 'Statement': {
				let transactions = this.getTransactions();
				let statements = transactions.map(item => [
					item.type.toUpperCase(),
					item.amount.toString(),
					item.balance.toString(),
					item.createdAt.toLocaleString()
				]);

				printTable(statements);
				break;
			}

			case 'Details': {
				console.log(this.showInfo());
				break;
			}

			case 'Exit': {
				let width = process.stdout.columns;
				let space = Math.floor((width - 35) / 2);
				let msg = chalk.bgHex('#002045').white;

				console.log();
				console.log(' '.repeat(space), msg(` ********************************** `))
				console.log(' '.repeat(space), msg(` *        ${chalk.bold('Thanks for using')}        * `))
				console.log(' '.repeat(space), msg(` *       ${chalk.bold('See you next time!')}       * `))
				console.log(' '.repeat(space), msg(` ********************************** \n`));
				process.exit(0);
			}
		}
	}
}

export default User;
