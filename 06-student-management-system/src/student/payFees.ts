import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from "nanospinner";
import { Student, sleep } from '../utils.js';


// Function to pay fees for a student
const payFees = async (student: Student) => {

    console.log('');

    // Prompt the user to confirm that they want pay fees 
    const { confirm } = await inquirer.prompt({
        message: `Are you sure want to pay fees for ${student.course}?`,
        name: 'confirm',
        type: 'confirm',
        default: true,
    })

    // Start spinner animation for processing the fee payment
    const spinner = createSpinner(chalk.yellowBright("Paying fees...")).start();
    await sleep(); // Simulate processing time

    // If user cancels, display error message and return
    if (!confirm) {
        spinner.error({ text: chalk.redBright('Something went wrong') });
        return student
    }

    // If fees is already paid return
    if (student.isPaid) {
        spinner.warn({ text: chalk.yellowBright('You have already paid your fees') });
        return student
    }

    // If balance is less than fees return 
    if (student.balance < student.fees) {
        spinner.error({ text: chalk.redBright('Insufficient balance') });
        return student;
    }

    // Pay fees and update balance
    student.balance -= student.fees;
    student.isPaid = true;

    // Display success message for fees paid
    spinner.success({ text: chalk.greenBright(`Fees paid successfully. Remaining balance: ${student.balance}`) });

    return student; // return the updated student
}

export default payFees;
