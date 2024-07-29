import chalk from "chalk";
import { createSpinner } from "nanospinner";
import { checkedTask, newTask, deletedTask } from "./Prompts.js";

//* Define the type for a todo item
type TodoItem = {
    completed: boolean;
    task: string;
}

//* Function to display a spinner with a message and success message
const spin = async (msg: string, successMsg: string) => {
    const spinner = createSpinner().start({ text: msg });     
    await new Promise((r) => setTimeout(r, 1500));     
    spinner.success({ text: chalk.greenBright(successMsg) }); 
}

//* Function to add a task to the todo list
export const addTask = async (todo: TodoItem[]) => {
    const taskName = await newTask(); // Prompt user to input new task name
    if (taskName.trim() === '') {
        return todo;
    }
    todo.push({ completed: false, task: taskName });
    await spin('Adding new task...', 'Task Added Successfully'); // Display spinner while adding task
    return todo;
}

//* Function to delete a task from the todo list
export const deleteTask = async (tasks: string[], todo: TodoItem[]) => {
    const task = await deletedTask(tasks); // Prompt user to select a task to delete

    // Filter out the selected task from the todo list
    const newTodo = todo.filter(element => {
        if (!(element.task === task)) {
            return element;
        }
    });
    
    await spin('Deleting task...', 'Task Deleted Successfully'); // Display spinner while deleting task
    return newTodo;
}

//* Function to display all tasks in the todo list
export const displayTasks = (todo: TodoItem[]) => {
    console.log(chalk.greenBright('Tasks:')); // Display all the tasks
    todo.forEach(element => {
        if (!element.completed) {
            console.log('\t' + chalk.cyanBright(element.task)); // If task is not competed
        } else {
            console.log('\t' + chalk.gray.strikethrough(element.task)); // If task is competed
        }
    });
}

//* Function to toggle the completion status of tasks in the todo list
export const toggleCompletedTasks = async (tasks: string[], todo: TodoItem[]) => {
    const checkedTasks = await checkedTask(tasks); // Prompt user to select tasks to mark as completed

    // Toggle completion status of selected tasks
    const newTodo = todo.map(element => {
        if (checkedTasks.includes(element.task)) {
            // Toggle completion status
            element.completed = !element.completed;
        }
        return element;
    });

    await spin('Checking tasks...', 'Tasks Marked as Completed'); // Display spinner while marking tasks
    return newTodo;
}

//* Function to get task names from the todo list
export const getTaskNames = (todo: TodoItem[]) => {
    // Extract task names from todo list
    return todo.map(element => element.task);
}
