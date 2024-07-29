#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


//* Prompt user for currency conversion inputs
const promptUser = async (countries: string[]) => {
    const validateNumber = (input: string) => {
        let number = parseInt(input, 10)
        if (isNaN(number) || number < 0) { return "Please enter a valid number" }
        return true;
    }

    const answer = await inquirer.prompt([
        {
            message: chalk.yellowBright("Please enter the amount of money you would like to convert:"),
            type: "input",
            name: "amount",
            validate: validateNumber,
        },
        {
            message: chalk.cyanBright("Select the country you're converting from:"),
            type: "list",
            name: "fromCurrency",
            choices: countries,
        },
        {
            message: chalk.cyanBright("Select the country you want to convert to:"),
            type: "list",
            name: "toCurrency",
            choices: countries,
        },
    ])
    return answer;
}

//* Fetch exchange rates from API
const apiFetcher = async () => {
    const URL = `https://openexchangerates.org/api/latest.json?api_id=b819fe9f1d6d4f2d8d201160598bff97`;

    try {
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Authorization": `Token b819fe9f1d6d4f2d8d201160598bff97`,
            }
        });
        const data = await response.json();

        if (data.error) { return undefined; }
        return data.rates;

    } catch (error) {
        return undefined;
    }
}

//* Convert currency based on user input and fetched exchange rates
const convertCurrency = async () => {
    // Fetch exchange rates from the API
    const rates = await apiFetcher();

    // Print error if there is any problem in fetching 
    if (!rates) {
        console.log(chalk.redBright.bold("Please check your network connection!"));
        return;
    }
    // Get list of country codes from fetched exchange rates
    const countries = Object.keys(rates);
    const user = await promptUser(countries);

    // Extract user input data
    const toCurrency: string = user.toCurrency.toUpperCase();
    const fromCurrency: string = user.fromCurrency.toUpperCase();
    const amount = parseFloat(user.amount);

    // Calculate converted amount
    const exchangeRate = rates[toCurrency] / rates[fromCurrency];
    const convertedAmount = amount * exchangeRate;

    const message = `\nYou've requested to convert ${amount} ${fromCurrency} to ${convertedAmount.toFixed(2)} ${toCurrency}.`
    console.log(chalk.blueBright(message));
}

//* Main function to orchestrate currency conversion
const main = async () => {
    await convertCurrency();
}

await main();

