import chalk from "chalk";
import inquirer from "inquirer";
import { validateName, validatePin } from "./validation.js";
import { createSpinner } from "nanospinner";


//* Function to take user data one time
export const userData = async (balance: number) => {
    const user = await inquirer.prompt([
        {
            message: chalk.yellow("Enter your user id: "),
            name: "userId",
            type: "input",
            validate: validateName,
        },
        {
            message: chalk.yellow("Enter your pin: "),
            name: "pin",
            type: "input",
            validate: validatePin,
        },
        {
            message: chalk.yellow("Select your account type: "),
            name: "account",
            type: "list",
            choices: ['Current', 'Saving'],
        },
    ]);
    const spinner = createSpinner('Logging...').start();
    await new Promise((r) => setTimeout(r, 2000))

    spinner.success({ text: chalk.green('Successfully logged in') });
    console.log(chalk.white.bold.italic(`Your balance is ${balance}`));   
}

//* Function to ask user for transition
export const transitionType = async () => {
    const { transaction } = await inquirer.prompt([
        {
            message: chalk.yellow("Select transaction you want to do: "),
            name: "transaction",
            type: "list",
            choices: ['Withdraw', 'Deposit', 'Transfer', 'Inquiry'],
        },
    ])

    return transaction;
}

//* Function to ask user if he/she want to do another transition
export const again = async () => {
    const { useAgain } = await inquirer.prompt([
        {
            message: chalk.yellow("Do you want to do another transaction "),
            name: "useAgain",
            type: "confirm",
            default: true,
        },
    ])

    return useAgain;
}
