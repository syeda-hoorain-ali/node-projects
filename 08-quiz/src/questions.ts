import inquirer from "inquirer";
import { handleAnswer } from "./handlers.js";


export const question1 = async () => {
    const { answer } = await inquirer.prompt({
        name: 'answer',
        type: 'list',
        message: 'What is TypeScript?',
        choices: ['A superset of JavaScript', 'A JavaScript framework', 'A replacement for JavaScript', 'A browser extension']
    })
    await handleAnswer(answer, 'A superset of JavaScript');
}

export const question2 = async () => {
    const { answer } = await inquirer.prompt({
        name: 'answer',
        type: 'list',
        message: 'Which keyword is used to declare a variable in TypeScript?',
        choices: ['let', 'var', 'const', 'Both a and c']
    })
    await handleAnswer(answer, 'Both a and c');
}

export const question3 = async () => {
    const { answer } = await inquirer.prompt({
        name: 'answer',
        type: 'list',
        message: 'Which of the following is NOT a basic data type in TypeScript?',
        choices: ['number', 'string', 'object', 'boolean']
    })
    await handleAnswer(answer, 'object');
}

export const question4 = async () => {
    const { answer } = await inquirer.prompt({
        name: 'answer',
        type: 'list',
        message: 'In TypeScript, what does the "?" symbol indicate when used in a function parameter?',
        choices: ['It marks the parameter as optional', 'It marks the parameter as required', 'It denotes a rest parameter', 'It indicates a default parameter']
    })
    await handleAnswer(answer, 'It marks the parameter as optional');
}

export const question5 = async () => {
    const { answer } = await inquirer.prompt({
        name: 'answer',
        type: 'list',
        message: 'Which command is used to compile TypeScript code into JavaScript?',
        choices: ['tsc', 'tscompile', 'tscript', 'compile']
    })
    await handleAnswer(answer, 'tsc');
}

export const question6 = async () => {
    const { answer } = await inquirer.prompt({
        name: 'answer',
        type: 'list',
        message: 'What is the purpose of the "interface" keyword in TypeScript?',
        choices: ['To define a new data type', 'To declare a class', 'To create a loop', 'To include a module']
    })
    await handleAnswer(answer, 'To define a new data type');
}

export const question7 = async () => {
    const { answer } = await inquirer.prompt({
        name: 'answer',
        type: 'list',
        message: 'Which TypeScript feature allows for the creation of reusable components with a well-defined API?',
        choices: ['Classes', 'Modules', 'Interfaces', 'Decorators']
    })
    await handleAnswer(answer, 'Interfaces');
}

export const question8 = async () => {
    const { answer } = await inquirer.prompt({
        name: 'answer',
        type: 'list',
        message: 'What does the "readonly" keyword do in TypeScript?',
        choices: ['It makes a property or variable immutable', 'It specifies that a property or variable can be modified', 'It defines a constant', 'It declares a private property']
    })
    await handleAnswer(answer, 'It makes a property or variable immutable');
}

export const question9 = async () => {
    const { answer } = await inquirer.prompt({
        name: 'answer',
        type: 'list',
        message: 'How can you explicitly specify the type of a variable in TypeScript?',
        choices: ['By using the "type" keyword', 'By using the "as" keyword', 'By using type inference', 'By using the "typeof" operator']
    })
    await handleAnswer(answer, 'By using the "type" keyword');
}

export const question10 = async () => {
    const { answer } = await inquirer.prompt({
        name: 'answer',
        type: 'list',
        message: 'Which of the following statements about TypeScript is true?',
        choices: ['TypeScript files have a .js extension', 'TypeScript code can be executed directly in the browser without transpilation', 'TypeScript supports all JavaScript features without any limitations', 'TypeScript is developed and maintained by the Mozilla Foundation']
    })
    await handleAnswer(answer, 'TypeScript supports all JavaScript features without any limitations');
}