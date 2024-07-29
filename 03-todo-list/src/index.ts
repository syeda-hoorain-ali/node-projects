#! /usr/bin/env node


import chalk from "chalk";
import { mainMenu } from "./Prompts.js";
import { addTask, displayTasks, getTaskNames, deleteTask as deleteTask, toggleCompletedTasks } from "./TodoService.js";

// Defining type for todo items
type TodoItem = {
    completed: boolean;
    task: string;
}

// Initial todo list
let todoList: TodoItem[] = [
    { completed: false, task: "Do 100 days coding challenge" },
    { completed: false, task: "Water plants" },
    { completed: true, task: "Make todo list" },
    { completed: false, task: "Exercise for 1 hour" },
    { completed: true, task: "Start next.js project" },
];

// Array to store task names
let taskName: string[] = [];

// Getting task names from todo list
taskName = getTaskNames(todoList);

// Main function to run the todo list application
const main = async () => {
    // Prompting user for main menu selection
    const selectedOption = await mainMenu();
    
    // Handling user's selection
    switch (selectedOption) {

        // Adding a new task
        case 'Add a Task':
            todoList = await addTask(todoList);
            taskName = getTaskNames(todoList);
            await main(); // Recursive call to main function to display main menu again
            break;

        // Deleting a task
        case 'Delete Task':
            todoList = await deleteTask(taskName, todoList);
            await main(); // Recursive call to main function to display main menu again
            break;

        // Viewing tasks
        case 'View Tasks':
            displayTasks(todoList); // Displaying tasks
            await main(); // Recursive call to main function to display main menu again
            break;

        // Completing a task
        case 'Complete a Task':
            todoList = await toggleCompletedTasks(taskName, todoList);
            await main(); // Recursive call to main function to display main menu again
            break;

        // Exiting the application
        case 'Exit':
            console.clear(); // Clearing console
            console.log(chalk.magentaBright.bold('Goodbye!'));
            process.exit(0); // Exiting the process
    }
}

await main(); // Calling main function to start the application
