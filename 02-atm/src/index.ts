#! /usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import { handleTransition } from "./handlers.js";
import { again, transitionType, userData } from "./prompts.js";


let balance = Math.floor(Math.random() * 10000); //* Generates random user account balance


//* Function to wait 
const sleep = async (sec: number) => {
    await new Promise((r) => setTimeout(r, sec))
}


//* Function to display the welcome message
const welcome = async () => {
    const title = chalkAnimation.rainbow("\n---------- Welcome To Hoorain's ATM  ----------\n");
    await sleep(2000);
    title.stop();
}

const main = async () => {

    // Prompt user to select a transaction type
    const transition = await transitionType();
    const message = await handleTransition(transition, balance);

    const spinner = createSpinner('Your transaction is being processing...').start();
    await sleep(2000);
    
    // Display the result message of the transaction
    if (message) {
        spinner.success({ text: chalk.green(message) });
    } else {
        spinner.error({ text: chalk.red(`Insufficient Balance`) });
    }

    // Prompt the user if they want to perform another transaction
    console.log(chalk.cyan(`\nThank You For Using Our ATM`));
    const useAgain = await again();

    if (useAgain) {
        await main();
    } else {
        console.clear();
        console.log(chalk.cyan(`\nThank You For Using Our ATM`));
        console.log(chalk.yellow(`See you next time`));
    }
}


await welcome();
await userData(balance);
await main();

