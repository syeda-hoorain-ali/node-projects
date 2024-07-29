import chalk from 'chalk';
import { createSpinner } from "nanospinner";
import { Student, sleep } from '../utils.js';

// Function to check balance of student's account
const checkBalance = async (student: Student) => {
    console.log('');

    // Start spinner animation for processing the deposit
    const spinner = createSpinner(chalk.yellowBright("Checking balance...")).start();
    await sleep(); // Simulate processing time

    // Display success message with the student's balance
    spinner.success({ text: chalk.greenBright(`Your balance is ${student.balance}`) });
}

export default checkBalance;
