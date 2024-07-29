import chalk from "chalk";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

let playerName: string;
let score = 0;
let lives = 1;

export const sleep = (ms = 2000) => {
    return new Promise((r) => setTimeout(r, ms));
}

export const askName = async () => {
    const user = await inquirer.prompt({
        name: 'name',
        message: 'Enter your name: ',
        type: 'input',
    })
    playerName = user.name; 
    return user.name
}

export const handleAnswer = async (userAnswer: string, answer: string) => {
    const spinner = createSpinner('Checking answer').start();
    await sleep();

    if (userAnswer === answer) {
        spinner.success({ text: chalk.greenBright(`Nice work ${playerName}. That's a legit answer\n`) });
        score += 10;

    } else {
        lives--;
        spinner.error({ text: chalk.red(`Oops! Wrong answer. You have ${chalk.magentaBright(lives)} lives left`) });
        console.log(chalk.yellowBright(`Correct answer is ${answer}\n`));

        if (lives <= 0) {
            console.log(chalk.bgMagenta.bold.cyanBright(' Thanks for playing \n See you next time! '));
            process.exit(0);
        }
    }
}

export const showConfetti = () => {
    console.clear();

    const width = process.stdout.columns;
    const height = process.stdout.rows;
    const colors = [
        chalk.red,
        chalk.green,
        chalk.blueBright,
        chalk.yellow,
        chalk.magenta,
        chalk.cyan,
        chalk.white,
    ];

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < height; i++) {
        let line = '';
        for (let j = 0; j < width; j++) {
            if (Math.random() > 0.9) {
                line += getRandomColor()('*');
            } else {
                line += ' ';
            }
        }
        console.log(line);
    }
}

export const getScore = () => score
