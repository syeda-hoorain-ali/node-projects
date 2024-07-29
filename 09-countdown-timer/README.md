# Countdown Timer CLI

A simple countdown timer CLI application built with Node.js, Inquirer, Chalk, and Ora.

## Features

- Select hours, minutes, and seconds using a search list prompt.
- Visual countdown timer with a dynamic spinner.
- Clear and colorful output using Chalk and Ora.

## Installation

To install the package, you can use npm:

```sh
npm install -g @syedahoorainali/countdown-timer
```

## Usage

To start the countdown timer, simply run the following command in your terminal:

```sh
countdown-timer
```

Or try without installing

```sh
npx @syedahoorainali/countdown-timer
```

You will be prompted to select hours, minutes, and seconds for the countdown.

## Example

```sh
$ countdown-timer
? Select Hours: 02
? Select Minutes: 30
? Select Seconds: 45

Starting timer...
Time Left: 02:30:44
Time Left: 02:30:43
...
Time Left: 00:00:01
Time Left: 00:00:00
```

## Development

### Prerequisites

- Node.js
- npm

### Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/syedahoorainali/node-project/tree/main/09-countdown-timer.git
    cd 09-countdown-timer
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

### Building the Package

To build the package for distribution:

```sh
npm run build
```

### Running the CLI Locally

To run the CLI locally for development purposes:

```sh
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue on GitHub.

## Acknowledgements

- [Inquirer](https://github.com/SBoudrias/Inquirer.js) - A collection of common interactive command line user interfaces.
- [Chalk](https://github.com/chalk/chalk) - Terminal string styling done right.
- [Ora](https://github.com/sindresorhus/ora) - Elegant terminal spinner.
- [inquirer-search-list](https://github.com/robin-rpr/inquirer-search-list) - Inquirer prompt for search list.

## Author

- [Syeda Hoorain ali](https://github.com/syeda-hoorain-ali)
