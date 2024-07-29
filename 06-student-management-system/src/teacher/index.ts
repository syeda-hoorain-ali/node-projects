import chalk from 'chalk';
import seeAndEditStudents from './seeAndEditStudents.js';
import { Student, students, updateStudents } from '../utils.js';
import addNewStudent from './addNewStudent.js';
import removeStudent from './removeStudent.js';
import addBalance from './addBalance.js';
import payFees from './payFees.js';
import checkBalance from './checkBalance.js';
import inquirer from 'inquirer';

const mainTeachers = async () => {

    // Initialize an array to store current student data
    let currentStudents: Student[] = [];

    // Function to prompt the user for the first action
    const promptInitialAction = async () => {
        console.log('');

        // Prompting the user to select an action
        const { answer } = await inquirer.prompt({
            message: "What you want to do:",
            name: "answer",
            type: "list",
            choices: ['Add new student', 'See and edit students', 'Add balance', 'Check balance', 'Pay fees', 'Remove student', 'Exit'],
        })
        return answer;
    }

    const initialAction = await promptInitialAction();

    // Switch case to handle user's choice
    switch (initialAction) {
        case 'Add new student':
            currentStudents = await addNewStudent(students);
            break;

        case 'See and edit students':
            currentStudents = await seeAndEditStudents(students);
            break;

        case 'Add balance':
            currentStudents = await addBalance(students);
            break;

        case 'Check balance':
            await checkBalance(students);
            break;

        case 'Pay fees':
            currentStudents = await payFees(students);
            break;

        case 'Remove student':
            currentStudents = await removeStudent(students);
            break;

        default:
            // Display a thank you message and exit the program
            console.log(chalk.cyanBright('Thank you for using our app'));
            console.log(chalk.yellowBright('\tSee you again soon!'));
            process.exit();
    }

    updateStudents(currentStudents); // Update the students data with the changes made

    // Recursively call the mainTeachers function to continue the interaction
    while (true) {
        await mainTeachers();
    }
}


export default mainTeachers;