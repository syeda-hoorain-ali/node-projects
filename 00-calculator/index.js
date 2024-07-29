#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
const answer = await inquirer.prompt([
    { message: "Enter First Number", type: "number", name: "firstNumber" },
    { message: "Enter Second Number", type: "number", name: "secondNumber" },
    { message: "Choose operator to perform operation", type: "list", name: "operator", choices: ["Addition", "Subtraction", "Multiplication", "Division"] }
]);
const { firstNumber, secondNumber, operator } = answer;
let output;
switch (operator) {
    case "Addition":
        output = chalk.green.bold(`${firstNumber} + ${secondNumber} = ${firstNumber + secondNumber}`);
        break;
    case "Subtraction":
        output = chalk.magenta.bold(`${firstNumber} - ${secondNumber} = ${firstNumber - secondNumber}`);
        break;
    case "Multiplication":
        output = chalk.yellow.bold(`${firstNumber} x ${secondNumber} = ${firstNumber * secondNumber}`);
        break;
    case "Division":
        output = chalk.cyan.bold(`${firstNumber} ÷ ${secondNumber} = ${firstNumber / secondNumber}`);
        break;
    default:
        output = chalk.red.bold("Please select a valid operator");
        break;
}
console.log(output);
