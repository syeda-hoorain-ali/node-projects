// @ts-nocheck

import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from "nanospinner";
import SearchList from 'inquirer-search-list';
import { Student, sleep } from '../utils.js';

inquirer.registerPrompt('search-list', SearchList); // Registering 'SearchList' prompt type with inquirer

// Function to check balance of student's account
const checkBalance = async (students: Student[]) => {

    // Check if there are no students
    if (students.length === 0) {
        console.log(chalk.magentaBright('There are no candidates'));
        return students
    }

    // Prepare choices for selecting a student (concatenating roll number and name)
    const studentsName: string[] = students.map(student => `${student.rollNo} ${student.name}`);

    console.log('');

    // Prompt the user to select a student to check balance
    const userSearch = await inquirer.prompt({
        message: "Enter student name or roll no:",
        name: "student",
        type: "search-list",
        choices: studentsName,
    })

    // Extract the roll number from the selected student
    const rollNo = userSearch.student.slice(0, 5);

    // Start spinner animation for processing the deposit
    const spinner = createSpinner(chalk.yellowBright("Checking balance...")).start();
    await sleep(); // Simulate processing time

    // Find the student by roll number
    const student = students.find(student => rollNo === student.rollNo);

    // Display success message with the student's balance
    spinner.success({ text: chalk.greenBright(`${student.name}, Roll No: ${rollNo}. Your balance is ${student.balance}`) });
}

export default checkBalance;
