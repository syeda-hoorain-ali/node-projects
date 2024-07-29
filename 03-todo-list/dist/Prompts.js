import chalk from "chalk";
import inquirer from "inquirer";
//* Function to display the main menu and prompt user for their selection
export const mainMenu = async () => {
    // Prompt user to select an option from the main menu
    const { selectedOption } = await inquirer.prompt([{
            message: chalk.yellow("What would you like to do?"),
            name: "selectedOption",
            type: "list",
            choices: ['Add a Task', 'Delete Task', 'View Tasks', 'Complete a Task', 'Exit'],
        }]);
    return selectedOption; // Return the selected option
};
//* Function to prompt user to enter a new task
export const newTask = async () => {
    const validator = (input) => {
        if (input.trim() === '') {
            return "Please enter the task";
        }
        return true;
    };
    // Prompt user to enter the task
    const { newTask } = await inquirer.prompt([{
            message: chalk.yellow("Enter the task: "),
            name: "newTask",
            type: "input",
            validate: validator
        }]);
    return newTask; // Return the entered task
};
//* Function to prompt user to select a task to delete
export const deletedTask = async (tasks) => {
    // Prompt user to select a task to delete from the list of available tasks
    const { task } = await inquirer.prompt([{
            message: chalk.yellow("Select Delete to Remove: "),
            name: "task",
            type: "list",
            choices: tasks, // Provide the list of available tasks as choices
        }]);
    return task; // Return the selected task to delete
};
//* Function to prompt user to select tasks to mark as completed
export const checkedTask = async (tasks) => {
    // Prompt user to select tasks to mark as completed from the list of available tasks
    const { checkedTask } = await inquirer.prompt([{
            message: chalk.yellow("Select task to mark as completed: "),
            name: "checkedTask",
            type: "checkbox",
            choices: tasks, // Provide the list of available tasks as choices
        }]);
    return checkedTask; // Return the selected tasks to mark as completed
};
