// @ts-nocheck

import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from "nanospinner";
import SearchList from 'inquirer-search-list';
import { Student, sleep } from '../utils.js';

inquirer.registerPrompt('search-list', SearchList); // Registering 'SearchList' prompt type with inquirer


// Function to pay fees for a student
const payFees = async (students: Student[]) => {

    // Check if there are no students
    if (students.length === 0) {
        console.log(chalk.magentaBright('There are no candidates'));
        return students
    }

    // Prepare choices for selecting a student (concatenating roll number and name)
    const studentsName: string[] = students.map(student => `${student.rollNo} ${student.name}`)

    console.log('');

    // Prompt the user to select a student to pay fees and confirm the action
    const { student, confirm } = await inquirer.prompt([
        {
            message: "Enter student name or roll no:",
            name: "student",
            type: "search-list",
            choices: studentsName,
        },
        {
            message: 'Are you sure want to pay fees?',
            name: 'confirm',
            type: 'confirm',
            default: true,
        }
    ])

    // Extract the roll number from the selected student
    const rollNo = student.slice(0, 5);

    // Start spinner animation for processing the fee payment
    const spinner = createSpinner(chalk.yellowBright("Paying fees...")).start();
    await sleep(); // Simulate processing time

    // If user cancels, display error message and return
    if (!confirm) {
        spinner.error({ text: chalk.redBright('Something went wrong') });
        return students
    }

    // Update student data based on fee payment status
    const updatedStudents = students.filter(student => {
        if (!rollNo === student.rollNo) {
            return student; // If roll no doesn't match return 
        }
        
        if (student.isPaid) {
            spinner.warn({ text: chalk.yellowBright('You have already paid your fees') });
            return student; // If fees is already paid return
        }

        if (student.balance < student.fees) {
            spinner.error({ text: chalk.redBright('Insufficient balance') });
            return student; // If balance is less than fees return 
        }

        // Pay fees and update balance
        student.balance -= student.fees;
        student.isPaid = true;

        // Display success message for fees paid
        spinner.success({ text: chalk.greenBright(`Student with Roll No: ${student.rollNo} and Name: ${student.name} has been successfully paid their fees. Remaining balance: ${student.balance}`) });

        return student;
    });


    return updatedStudents; // Return the updated student list

}

export default payFees;
