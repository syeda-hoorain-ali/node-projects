#! /usr/bin/env node

import inquirer from "inquirer";
import User from "./User.js";
import { welcome } from "./utils.js";

await welcome();


const { firstName, lastName, age, gender, phone } = await inquirer.prompt([
    {
        name: 'firstName',
        message: 'Enter First Name:',
        type: 'input',
    },
    {
        name: 'lastName',
        message: 'Enter Last Name:',
        type: 'input',
    },
    {
        name: 'age',
        message: 'Enter You Age:',
        type: 'number',
        validate(input: number) {
            if (isNaN(input)) return 'Enter a valid age!';
            if (input < 18) return 'Age should be greater 18!';
            return true;
        },
    },
    {
        name: 'gender',
        message: 'Select Gender:',
        type: 'list',
        choices: ['Male', 'Female', 'Other']
    },
    {
        name: 'phone',
        message: 'Enter Your Phone No:',
        type: 'input',
        validate(input: string) {
            if (input.trim().length < 11) return 'Enter a valid phone no!';
            if (isNaN(Number(input))) return 'Enter a valid phone no!';
            return true
        },
    }
]);

const newCustomer = new User(firstName, lastName, age, gender, phone)

while (true) {
    await newCustomer.askQuestion();
}

