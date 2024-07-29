// @ts-nocheck

import chalk from 'chalk';
import inquirer from 'inquirer';
import TableInput from 'inquirer-table-input';
import { Student } from '../utils.js';

inquirer.registerPrompt("table-input", TableInput); // Registering 'TableInput' prompt type with inquirer


// Function to see and edit student details
const seeAndEditStudents = async (students: Student[]) => {

    // Check if there are no students
    if (students.length === 0) {
        console.log(chalk.magentaBright('There are no candidates'));
        return students
    }

    // Convert the 'isPaid' property of each student to a string representation ('YES' or 'NO')
    const studentsData = students.map(singleStudent => [
        singleStudent.rollNo,
        singleStudent.name,
        singleStudent.fatherName,
        singleStudent.course,
        String(singleStudent.balance),
        String(singleStudent.fees),
        singleStudent.isPaid ? 'YES' : 'NO'
    ]);

    // const studentsData = students.map(singleStudent => ({
    //     "Roll No": singleStudent.rollNo,
    //     Name: singleStudent.name,
    //     'Father Name': singleStudent.fatherName,
    //     Course: singleStudent.course,
    //     Balance: String(singleStudent.fees),
    //     Paid: singleStudent.isPaid ? 'YES' : 'NO'
    // }));

    // Define table column headings
    const headings = [
        { name: chalk.cyan.bold("Roll No"), value: "rollNo" },
        { name: chalk.cyan.bold("Name"), value: "name", editable: "text" },
        { name: chalk.cyan.bold("Father Name"), value: "fatherName", editable: "text" },
        { name: chalk.cyan.bold("Course"), value: "course", editable: "text" },
        { name: chalk.cyan.bold("Balance"), value: "balance" },
        { name: chalk.cyan.bold("Fees"), value: "fees", editable: "number" },
        { name: chalk.cyan.bold("Paid"), value: "isPaid" },
    ]

    const isValidData = studentsData.every(row => row.every(cell => typeof cell === 'string'));
    console.log(isValidData);


    if (!isValidData) {
        console.log(chalk.red('Invalid data'));
        return students
    }

    // Prompt the user to see and edit student details using a table interface
    const { updatedStudents } = await inquirer.prompt([{
        type: "table-input",
        name: "updatedStudents",
        message: chalk.yellowBright("GIAIC Students"),
        infoMessage: chalk.grey('(Navigate and Edit)'),
        hideInfoWhenKeyPressed: true,
        selectedColor: chalk.yellow,
        editableColor: chalk.bgYellow.bold,
        editingColor: chalk.bgGreen.bold,
        columns: headings,
        rows: studentsData,
    }]);

    return updatedStudents.result; // Return the updated student data
}

export default seeAndEditStudents;