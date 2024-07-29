import chalk from "chalk";
import CliTable3 from "cli-table3";
import { createSpinner } from "nanospinner";


export const spin = async (message: string, success: boolean) => {
    const spinner = createSpinner('Your transaction is being processing...').start();
    await new Promise(r => setTimeout(r, 2000));

    if (success) {
        spinner.success({ text: chalk.greenBright(message) });
        return
    }
    spinner.error({ text: chalk.red(message) });
}

export const validator = (num: number) => {
    if (isNaN(num)) return 'Enter a valid amount!';
    if (num <= 0) return 'Enter a valid amount!';
    if ((num % 500) !== 0) return 'Amount should be in multiple of 500!';
    return true;
}

export const printTable = async (transactions: string[][]) => {
    let table = new CliTable3({
        head: ['Type', 'Amount', 'Balance', 'Created At'],
        style: { head: ['magenta', 'bold'] }
    });

    table.push(...transactions);

    console.log(table.toString());
}

export const welcome = async () => {
    let width = process.stdout.columns;
    let space = Math.floor((width - 35) / 2);
    let msg = chalk.bgHex('#002045').white;

    console.clear();
    console.log(' '.repeat(space), msg(` ********************************** `));
    console.log(' '.repeat(space), msg(` *                                * `));
    console.log(' '.repeat(space), msg(` *       ${chalk.bold('Welcome to my bank')}       * `))
    console.log(' '.repeat(space), msg(` *                                * `));
    console.log(' '.repeat(space), msg(` ********************************** `));

    await new Promise(r => setTimeout(r, 2000))
    console.clear()
}
