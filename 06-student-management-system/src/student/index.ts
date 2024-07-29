import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import { Student, sleep, students } from '../utils.js';
import payFees from './payFees.js';
import addBalance from './addBalance.js';
import seeDetails from './seeDetails.js';
import checkBalance from './checkBalance.js';

const mainStudents = async () => {

    let currentStudent: Student;

    const getRollNo = async () => {

        const validate = (input: string) => {
            const number = parseInt(input);
            if (isNaN(number)) return "Please enter a valid roll no";
            return true;
        }

        const { rollNo } = await inquirer.prompt({
            message: "Enter your roll no:",
            name: "rollNo",
            type: "input",
            validate,
        })
        return rollNo;
    }

    const firstPrompt = async () => {
        console.log('');

        const { answer } = await inquirer.prompt({
            message: "What you want to do:",
            name: "answer",
            type: "list",
            choices: ['See Details', 'Add balance', 'Check balance', 'Pay fees', 'Exit'],
        })
        return answer;
    }


    const rollNo = await getRollNo();
    const student = students.find(student => rollNo === student.rollNo);
    const spinner = createSpinner(chalk.yellowBright("Checking roll no...")).start();
    await sleep();

    if (!student) {
        spinner.error({ text: chalk.redBright(`Roll No: ${rollNo} could not found in list.`) });
        await mainStudents();
        return;
    }
    spinner.success({ text: chalk.greenBright(`${student.name}, Roll No: ${rollNo} is successfully login`) });


    const main = async () => {
        const first = await firstPrompt();

        switch (first) {
            case 'See Details':
                await seeDetails(student);
                break;

            case 'Add balance':
                currentStudent = await addBalance(student);
                break;

            case 'Check balance':
                await checkBalance(student);
                break;

            case 'Pay fees':
                currentStudent = await payFees(student);
                break;

            default:
                console.log(chalk.cyanBright('Thank you for using our app'));
                console.log(chalk.yellowBright('\tSee you again soon!'));
                process.exit();
        }
    }

    while (true) {
        await main();
    }
}


export default mainStudents;