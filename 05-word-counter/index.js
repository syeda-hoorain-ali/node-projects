#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//* Function to prompt user for input sentence
const promptUserForSentence = async () => {
    const { inputSentence } = await inquirer.prompt({
        message: chalk.bold.yellowBright("Enter the sentence to count words. "),
        type: "input",
        name: "inputSentence",
    });
    return inputSentence;
};
//* Function to count words in a given text
const countWords = (text) => {
    const wordsArray = text.trim().split(' '); // Split the text into words
    const nonEmptyWordsArray = wordsArray.filter(word => word.length > 0); // Filter out empty strings
    return nonEmptyWordsArray.length;
};
//* Main function to orchestrate the word counting process
const main = async () => {
    console.log(`     ********** ${chalk.greenBright.bold("Word Counter")} **********`);
    const sentence = await promptUserForSentence();
    const words = countWords(sentence);
    console.log(chalk.cyanBright(`Total words in your sentences are ${chalk.magentaBright(words)}`));
};
//* Execute the main function
await main();
