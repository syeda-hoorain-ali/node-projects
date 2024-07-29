// @ts-nocheck

import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from "nanospinner";
import SearchList from 'inquirer-search-list';
import { Student, sleep } from '../utils.js';

inquirer.registerPrompt('search-list', SearchList); // Registering 'SearchList' prompt type with inquirer

// Function to add balance to a student's account
const addBalance = async (students: Student[]) => {

    // Check if there are no students
    if (students.length === 0) {
        console.log(chalk.magentaBright('There are no candidates'));
        return students
    }

    // Prepare choices for selecting a student (concatenating roll number and name)
    const studentsName: string[] = students.map(student => `${student.rollNo} ${student.name}`)

    // Function to validate the amount entered by the user
    const validateNumber = (input: number) => {
        if (isNaN(input) || (input < 0)) return `Enter a valid amount`;
        return true;
    }

    console.log('');

    // Prompt the user to select a student and enter the amount to deposit
    const { student, amount } = await inquirer.prompt([
        {
            message: "Enter student name or roll no:",
            name: "student",
            type: "search-list",
            choices: studentsName,
        },
        {
            message: 'Enter amount you want to deposit:',
            name: 'amount',
            type: 'number',
            validate: validateNumber,
        }
    ])

    // Extract the roll number from the selected student
    const rollNo = student.slice(0, 5);

    // Start spinner animation for processing the deposit
    const spinner = createSpinner(chalk.yellowBright("Processing Deposit...")).start();
    await sleep(); // Simulate processing time

    let balance: number;

    // Update the student's balance and retrieve the new balance
    const updatedStudents = students.filter(student => {
        
        if (rollNo !== student.rollNo) return student;

        student.balance += parseFloat(amount);
        balance = student.balance;
        return student;
    });

    // Display success message with the updated balance
    spinner.success({ text: chalk.greenBright(`Student with Roll No: ${rollNo} and Name: ${student.slice(6)} has been successfully update their balance. New balance is ${balance}`) });

    return updatedStudents; // Return the updated students data

}

export default addBalance;
