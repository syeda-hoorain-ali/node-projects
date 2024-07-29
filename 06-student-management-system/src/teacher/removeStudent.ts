// @ts-nocheck

import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from "nanospinner";
import SearchList from 'inquirer-search-list';
import { Student, sleep } from '../utils.js';

inquirer.registerPrompt('search-list', SearchList); // Registering 'SearchList' prompt type with inquirer


// Function to remove a student from the list
const removeStudent = async (students: Student[]) => {

    // Check if there are no students
    if (students.length === 0) {
        console.log(chalk.magentaBright('There are no candidates'));
        return students
    }

    // Prepare choices for selecting a student (concatenating roll number and name)
    const studentsName: string[] = students.map(student => `${student.rollNo} ${student.name}`)

    console.log('');

    // Prompt the user to select a student to remove and confirm the action
    const { removedStudent, confirm } = await inquirer.prompt([
        {
            message: "Enter student name or roll no:",
            name: "removedStudent",
            type: "search-list",
            choices: studentsName,
        },
        {
            message: "Are you sure want to remove this student?",
            name: 'confirm',
            type: 'confirm',
            default: true,
        }
    ])

    // Extract the roll number from the selected student
    const rollNo = removedStudent.slice(0, 5);

    // Start spinner animation for processing the removal
    const spinner = createSpinner(chalk.yellowBright("Removing Student...")).start();
    await sleep(); // Simulate processing time

    // If user cancels, display error message and return
    if (!confirm) {
        spinner.error({ text: chalk.redBright('Something went wrong') });
        return students
    }

    // Filter out the removed student from the list
    const updatedStudents = students.filter(student => !(rollNo === student.rollNo));

    // Display success message for the removal
    spinner.success({ text: chalk.greenBright(`Student with Roll No: ${rollNo} and Name: ${removedStudent.slice(6)} has been successfully removed.`) });

    return updatedStudents; // Return the updated student list
}

export default removeStudent;
