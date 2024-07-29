import chalk from 'chalk';
import inquirer from 'inquirer';
import { createSpinner } from "nanospinner";
import { Student, titleCase, sleep } from '../utils.js';

// Function to add a new student
const addNewStudent = async (students: Student[]) => {

    // Check if maximum capacity is reached
    if (students.length === 10) {
        console.log(chalk.yellowBright('Oops! Seats are full. Better luck next time'));
        return students;
    }

    // Define available courses and their fees
    const courses: any = {
        "Artificial Intelligence": 1500,
        "Blockchain": 2000,
        "Internet of Things": 1000,
        "Cloud Native and Mobile Web": 1000,
    }

    // Function to generate a unique roll number for the new student
    const rollNoGenerator = () => {
        // Check if there are no students
        if (students.length === 0) return '00001';

        const lastRollNo = parseInt(students[students.length - 1].rollNo);
        const newRollNo = String(lastRollNo + 1).padStart(5, '0');
        return newRollNo;
    }

    console.log('');

    // Prompt the user to input student details
    const userAnswer = await inquirer.prompt([
        {
            message: "Enter student name:",
            name: "name",
            type: "input",
            validate: input => !(input.trim() === '') ? true : "Enter a valid name.",
        },
        {
            message: "Enter father name:",
            name: "fatherName",
            type: "input",
            validate: input => !(input.trim() === '') ? true : "Enter a valid name.",
        },
        {
            message: "Select your course:",
            name: "course",
            type: "list",
            choices: Object.keys(courses)
        }
    ])

    // Capitalize student name and father's name
    const name: string = titleCase(userAnswer.name).trim();
    const fatherName: string = titleCase(userAnswer.fatherName).trim();
    const course: string = userAnswer.course;

    // Display confirmation message with student details
    console.log(chalk.cyanBright(`\n${name} ${fatherName} want to enroll in ${course} with ${courses[course]} fees.`));

    // Prompt for confirmation
    const { confirm } = await inquirer.prompt({
        message: 'Processed?',
        name: 'confirm',
        type: 'confirm',
        default: true,
    })

    // Start spinner animation for processing enrollment
    const spinner = createSpinner(chalk.yellowBright("Processing Enrollment...")).start();
    await sleep(); // Simulate processing time

    // If user does not confirm, display error and return
    if (!confirm) {
        spinner.error({ text: chalk.redBright('Something went wrong') });
        return students
    }


    // Create student object with generated roll number and add to students array
    const student: Student = {
        rollNo: rollNoGenerator(),
        name,
        fatherName,
        course,
        balance: 0,
        fees: courses[course],
        isPaid: false,
    }

    students.push(student); // Add student to array
    spinner.success({ text: chalk.greenBright(`Student with Roll No: ${student.rollNo} and Name: ${student.name} has been successfully enrolled.`) });

    return students; // Return updated student array
}

export default addNewStudent;

