#! /usr/bin/env node

import inquirer from 'inquirer';
import showBanner from 'node-banner';
import mainStudents from './student/index.js';
import mainTeachers from './teacher/index.js';
import newAdmission from './admission/index.js';

// Displaying a banner with the title "GIAIC" and a welcome message
await showBanner('  G I A I C', 'Welcome to GIAIC Student Management System', 'green');


// Main function for handling user interaction and routing
const main = async () => {

    // Prompting the user to select their role
    const { roll } = await inquirer.prompt({
        message: "Select your roll",
        name: 'roll',
        type: 'list',
        choices: ['Teacher', 'Student', 'New Admission']
    });

    // Switch case to route based on user's selected role
    switch (roll) {
        case 'Teacher':
            await mainTeachers();
            break;

        case 'Student':
            await mainStudents();
            break;

        default:
            await newAdmission();
            break;
    }
}

await main(); // Execute the main function to start the program
