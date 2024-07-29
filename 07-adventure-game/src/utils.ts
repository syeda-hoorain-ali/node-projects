import chalk from "chalk";
import { Action } from "./types.js";
import boxen from "boxen";
import { emojify } from 'node-emoji'
import ora from "ora";

//* Function to simulate a delay
export const sleep = async (sec: number) => {
    await new Promise(r => setTimeout(r, sec));
}

//* Function to display an alert message
export const alertMessage = (message: string) => {
    console.log(boxen(chalk.redBright(message), {
        width: 40,
        borderStyle: 'double',
        title: chalk.bold('Alert'),
        titleAlignment: 'center',
        textAlignment: 'center'
    }));
}

//* Function to perform spinning animation
export const animation = async (frames: string[], emojis: string[], seconds: number, interval = 50) => {

    let newFrames: string[] = frames;
    emojis.forEach(emoji => {
        // For each emoji, replace occurrences of the emoji within each frame with its text representation
        newFrames = newFrames.map(frame => frame.replaceAll(emoji, emojify(`:${emoji}:`)))
    })

    const spinner = ora(''); // Create a new instance of the ora spinner

    // Configure the spinner's interval and frames with the modified frames array
    spinner.spinner = {
        interval,
        frames: newFrames,
    }

    spinner.start();
    await sleep(seconds);

    // Stop the spinner and show the last frame as the final output, without any symbol
    spinner.stopAndPersist({
        text: newFrames[newFrames.length - 1],
        symbol: ''
    })
}

//* Define an object to hold actions for each enemy attack
export const attackingEnemy: Action = {
    'Zombie': async (frames) => {
        await animation(frames.attacking_zombie, ['man_zombie', 'dagger', 'walking_man'], 1250);
    },
    'Skeleton': async (frames) => {
        await animation(frames.attacking_skeleton, ['skull', 'dagger', 'walking_man', 'boom'], 2400, 70);
    },
    'Spider': async (frames) => {
        await animation(frames.attacking_spider, ['spider', 'dagger', 'walking_man'], 1250);
    },
    'Creeper': async (frames) => {
        await animation(frames.attacking_creeper, ['leafy_greens', 'dagger', 'walking_man', 'boom'], 2200);
    }
};

//* Define an object to hold running animation for each enemy 

export const runningMan: Action = {
    'Zombie': async (frames) => {
        await animation(frames.running_away_from_zombie, ['man_zombie', 'running_man'], 1250);
    },
    'Skeleton': async (frames) => {
        await animation(frames.running_away_from_skeleton, ['skull', 'running_man'], 1250);
    },
    'Spider': async (frames) => {
        await animation(frames.running_away_from_spider, ['spider', 'running_man'], 1250);
    },
    'Creeper': async (frames) => {
        await animation(frames.running_away_from_creeper, ['leafy_greens', 'running_man'], 1250);
    }
};