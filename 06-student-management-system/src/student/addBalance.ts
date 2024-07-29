import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from "nanospinner";
import { Student, sleep } from '../utils.js';


// Function to add balance to a student's account
const addBalance = async (student: Student) => {

    console.log('');

    // Function to validate the amount entered by the user
    const validateNumber = (input: number) => {
        if (isNaN(input) || (input < 0)) return `Enter a valid amount`;
        return true;
    }

    // Prompt the user to enter the amount to deposit
    const { amount } = await inquirer.prompt({
        message: 'Enter amount you want to deposit:',
        name: 'amount',
        type: 'number',
        validate: validateNumber,
    })

    // Start spinner animation for processing the deposit
    const spinner = createSpinner(chalk.yellowBright("Processing Deposit...")).start();
    await sleep(); // Simulate processing time

    // Update the student's balance and retrieve the new balance
    student.balance += parseFloat(amount);

    // Display success message with the updated balance
    spinner.success({ text: chalk.greenBright(`Your balance has successfully update. New balance is ${student.balance}`) });

    return student; // Return the updated student data
}

export default addBalance;
