#! /usr/bin/env node

import chalkAnimation from 'chalk-animation';
import chalk from 'chalk';
import figlet from 'figlet'
import gradient from 'gradient-string'
import { askName, getScore, showConfetti, sleep } from './handlers.js';
import * as Question from './questions.js';


const main = async () => {

    //* Start
    console.clear();
    
    const title = chalkAnimation.rainbow('Welcome to TypeScript quiz\n');
    await sleep();
    title.stop();

    console.log(chalk.bgBlue.whiteBright(" Let's see how much you know "));
    const playerName = await askName();

    //* Questions
    await Question.question1()
    await Question.question2()
    await Question.question3()
    await Question.question4()
    await Question.question5()
    await Question.question6()
    await Question.question7()
    await Question.question8()
    await Question.question9()
    await Question.question10()


    //* Finish
    const ani = setInterval(showConfetti, 300);
    await sleep();
    clearInterval(ani);
    console.clear();

    const data = figlet.textSync(`Congrats , ${playerName} !\n Score: ${getScore()}!`, { horizontalLayout: 'full', verticalLayout: 'full' });
    console.log(gradient.pastel.multiline(data));

    console.log(chalk.green(`\nProgramming isn't about what you know; it's about making the command line look cool`));
    console.log(chalk.cyan(`See you next time.`));

    process.exit(0);
}

await main();
