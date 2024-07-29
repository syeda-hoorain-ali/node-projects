import chalk from "chalk";
import Table from 'cli-table'
import { Student } from "../utils.js"

// Function to see student details
const seeDetails = async (student: Student) => {
    console.log('');

    // Create a new table using cli-table
    const table = new Table();
    
    // Add all the student data to table
    table.push(
        { "Roll No": student.rollNo },
        { "Name": student.name },
        { "Father name": student.fatherName },
        { "Course": student.course },
        { "Balance": String(student.balance) },
        { "Fees": String(student.fees) },
        { "Paid": student.isPaid ? 'YES' : 'NO' },
    );
    
	console.log(chalk.yellowBright.bold("Student Information"));
    console.log(table.toString()); // Print table
}


export default seeDetails;