import boxen from 'boxen';
import chalk from 'chalk';
import figlet from 'figlet';
import fs from 'node:fs';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import terminalImage from 'terminal-image';
import PressToContinuePrompt from 'inquirer-press-to-continue';
import { Enemy, Player } from './types.js';
import { alertMessage, animation, attackingEnemy, runningMan, sleep } from './utils.js';

//* Register custom prompt
inquirer.registerPrompt('press-to-continue', PressToContinuePrompt);


//* Main game function
const playGame = async () => {
    try {
        //& ------------------------------------------------------------
        //^ Welcome Section
        //& ------------------------------------------------------------

        console.clear(); // Clear the console

        // Create the banner image using terminal-image library
        const bannerImage = await terminalImage.file(`./assets/logo.png`, { width: 20, height: 20 });

        // Create a stylized "PLAY" button using boxen and chalk libraries
        const play = boxen(chalk.black(' PLAY'), { backgroundColor: 'greenBright', borderStyle: 'bold', borderColor: '#017561', padding: 0.5, textAlignment: 'center' });

        // Display the welcome message with the banner image and "PLAY" button
        console.log(boxen(`${bannerImage} Welcome to MINECRAFT \n${play}`, {
            padding: 1,
            borderStyle: 'none',
            width: 85,
            textAlignment: 'center',
        }));

        // Prompt the user to enter their name
        const { playerName } = await inquirer.prompt({
            name: 'playerName',
            message: 'Enter you name:',
            type: 'input',
            validate: input => (input.trim() === '') ? 'Enter a valid name' : true
        });

        // Wait for the user to press any key to continue
        await inquirer.prompt({
            name: 'key',
            type: 'press-to-continue',
            anyKey: true
        });


        //& ------------------------------------------------------------
        //^ Loading Section
        //& ------------------------------------------------------------

        console.clear(); // Clear the console
        console.log('\n\n\n\n'); // Add some empty lines for spacing

        // Display the loading message using boxen, formatted
        console.log(boxen(chalk.greenBright.bold('Loading... '), {
            padding: 1,
            borderStyle: 'none',
            width: 85,
            textAlignment: 'center',
        }));

        // Load and display the animated GIF using terminal-image library
        const loadingGIF = terminalImage.gifFile(`./assets/loading.gif`, { width: 80, height: 122 });
        await sleep(1700); // Wait for a short delay to simulate loading
        loadingGIF(); // Stop the loaded GIF

        //& ------------------------------------------------------------
        //^ Game Setup
        //& ------------------------------------------------------------

        console.clear();

        //* Player properties
        const player: Player = {
            name: playerName,
            score: 0,
            health: 100,
            attackDamage: 40,
            healthPotions: 3,
            healthPotionsHealAmount: 30,
            healthPotionsDropChance: 50, // Percentage
        }

        //* Enemy Properties
        const enemies: Enemy = {
            names: ['Zombie', 'Skeleton', 'Creeper', 'Spider'],
            health: 75,
            attackDamage: 25
        }

        let running = true;

        //* Game Loop

        while (running) {

            // Read the contents of spinner.json synchronously
            const spinnerData = fs.readFileSync('spinner.json', 'utf-8');
            const spinnerFrames = await JSON.parse(spinnerData);

            // Display running animation while waiting
            await animation(spinnerFrames.running, ['running_man'], 2000);

            // Starting the game logic for each turn
            let index = Math.floor(Math.random() * enemies.names.length);
            let enemy = enemies.names[index];
            let enemyHealth = Math.floor(Math.random() * enemies.health);

            // Starting the game logic for each turn //! Wrong comment 
            alertMessage(`# ${enemy} has appeared! #`);

            //* Player's turn
            while (enemyHealth > 0) {

                console.log('------------------------------------------------------');
                // Display player and enemy health 
                console.log(`\tYour HP: ${player.health}\n\t${enemy}'s HP: ${enemyHealth}`);

                // Prompt the user for their action
                const { userChoice } = await inquirer.prompt({
                    message: "What would you like to do?",
                    name: 'userChoice',
                    type: 'list',
                    choices: ['🗡  Attack', '🧴 Drink health potion', '🏃 Run!!!']
                })

                //* Handle player's choice
                if (userChoice === '🗡  Attack') {
                    // Execute the appropriate action based on the enemy
                    await attackingEnemy[enemy](spinnerFrames);

                    // Calculate damage dealt and taken
                    let damageDealt = Math.floor(Math.random() * player.attackDamage);
                    let damageTaken = Math.floor(Math.random() * enemies.attackDamage);

                    // Update health and score
                    enemyHealth -= damageDealt;
                    player.health -= damageTaken;
                    player.score += 10;

                    // Display combat messages
                    console.log(chalk.magentaBright(`You strike the ${enemy} for ${damageDealt} damage.`));
                    console.log(chalk.magentaBright(`You take ${damageTaken} damage in retaliation!`));

                    // Check if player's health drops to 0 or below
                    if (player.health < 1) {
                        alertMessage("You have taken too much damage you are too weak to go on!");
                        break;
                    }

                } else if (userChoice === '🧴 Drink health potion') {

                    if (player.healthPotions <= 0) {
                        alertMessage("You have no health potions left! Defeat enemies for a chance to get one!")
                        // break;
                        continue;
                    }

                    await animation(spinnerFrames.drinking_potion, ['tipping_hand_woman', 'lotion_bottle', 'boom', 'frowning_woman'], 1200, 130);

                    player.health += player.healthPotionsHealAmount;
                    player.healthPotions--;

                    console.log(chalk.magentaBright(`You drink a health potion, healing yourself for ${player.healthPotionsHealAmount}. \nYou now have ${player.health} HP. \nYou have ${player.healthPotions} health potions left.`));

                } else if (userChoice === '🏃 Run!!!') {

                    // Execute the appropriate action based on the enemy
                    await runningMan[enemy](spinnerFrames);
                    console.log(chalk.magentaBright(`You ran away from ${enemy}!`));
                }
            }

            // Check if player lost
            if (player.health < 1) {
                alertMessage("You Die!!!\nYou have no HP left");
                await sleep(3500);
                break;
            }

            // Display victory message
            console.log(chalk.yellowBright(`\t# ${enemy} was defeated! #`));
            console.log(chalk.yellowBright(`\t# You have ${player.health} HP left. #`));

            // Drop health potion
            let randomNumber = Math.floor(Math.random() * 100);
            if (randomNumber < player.healthPotionsDropChance) {
                player.healthPotions++;
                console.log(boxen(chalk.hex('#00F700')(`# The ${enemy} dropped a health potion! #\n# You now have ${player.healthPotions} health potion(s). #`), {
                    width: 42,
                    borderStyle: 'none',
                    textAlignment: 'center'
                }));
            }
            console.log('------------------------------------------------------');

            // Prompt for next action
            const { nextChoice } = await inquirer.prompt({
                message: "What would you like to do now?",
                name: "nextChoice",
                type: 'list',
                choices: ['Continue fighting', 'Exit Minecraft'],
            })

            if (nextChoice !== 'Continue fighting') {
                break;
            }
        }


        //& ------------------------------------------------------------
        //^ Game Over Section
        //& ------------------------------------------------------------

        console.clear();
        let message = `Thanks for playing!\n \tYour Score: ${player.score}`;

        figlet(message, { horizontalLayout: 'fitted' }, (err, data) => {

            console.log(boxen(gradient.pastel.multiline(data), {
                borderStyle: 'none',
                fullscreen: true,
                height: 14,
                textAlignment: 'center'
            })
            )
            console.log(chalk.green(`Programming isn't about what you know; It's about making the command line look cool`));
            process.exit(0);

        });


    } catch (err) {
        console.error('Error reading spinner.json:', err);
    }
}


await playGame();

