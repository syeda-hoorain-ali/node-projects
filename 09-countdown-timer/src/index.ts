#! /usr/bin/env node

import inquirer from 'inquirer';
//@ts-ignore
import SearchList from 'inquirer-search-list';
import chalk from 'chalk';
import ora from 'ora'

inquirer.registerPrompt('search-list', SearchList);

const getNumbers = (to: number) => {
    let arr: string[] = [];
    for (let i = 0; i <= to; i++) {
        let num = String(i).padStart(2, '0')
        arr.push(num)
    }
    return arr;
}

const generateFrame = (secs: number) => {
    const frames: string[] = []

    for (let i = secs; i > 0; i--) {

        let h = Math.floor(i / 3600)
        let m = Math.floor((i % 3600) / 60);
        let s = i % 60;

        let hours = String(h).padStart(2, '0');
        let mins = String(m).padStart(2, '0');
        let secs = String(s).padStart(2, '0');

        frames.push(`Time Left: ${hours}:${mins}:${secs}`);
    }
    return frames;
}

const { userHours, userMins, userSecs } = await inquirer.prompt([
    {
        name: 'userHours',
        message: 'Select Hours:',
        type: 'search-list',
        choices: getNumbers(23),
    },
    {
        name: 'userMins',
        message: 'Select Minutes:',
        type: 'search-list',
        choices: getNumbers(59),
    },
    {
        name: 'userSecs',
        message: 'Select Seconds:',
        type: 'search-list',
        choices: getNumbers(59),
    },
]);

let totalSec = (Number(userHours) * 3600) + (Number(userMins) * 60) + Number(userSecs);

console.clear();
console.log(chalk.yellowBright('Starting timer...'));

const spinner = ora({
    text: ' ',
    color: 'cyan',
    spinner : {
        interval: 1000,
        frames: generateFrame(totalSec),
    }
})

spinner.start();
await new Promise(r => setTimeout(r, totalSec * 1000));

spinner.stopAndPersist({
    symbol: 'Time Left: 00:00:00'
})

