import inquirer from "inquirer";
import Person from "./Person.js";
import Student from "./Student.js";

const { name, num } = await inquirer.prompt([
    {
        name: 'name',
        type: 'input',
        message: 'Enter your name:'
    },
    {
        name: 'num',
        type: 'number',
        message: 'Type 1 if you like to talk to others and type 2 if you would rather keep to yourself'
    }
]);


//* Person Class
let myPerson = new Person()
myPerson.askQuestion(num)

//* Student Class
let newStudent: Student = new Student();
newStudent.askQuestion(num);
newStudent.name = name;

console.log(`Hi ${newStudent.name}, you are a ${newStudent.getPersonality()}`);

