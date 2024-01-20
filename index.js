#!/usr/bin/env node

const {exec} = require("child_process");
const gitClone = require("git-clone");
const inquirer = require("inquirer");

// Display CLI signature or banner
console.log("  ____    ___    _    ");
console.log(" / ___ \\ / __| | |   ");
console.log("| |__ | || |    | |   ");
console.log("|  ___| || |___ | |___");
console.log("| |   | | \\___||_____\\ ");
console.log("CLI is running");

inquirer
  .prompt([
    {
      type: "list",
      name: "boilerplateName",
      message: "Choose a boilerplate name to clone into your device:",
      choices: ["abcd", "simple-fullstack", "todoApp-nestjs", "urlShortning-api"],
    },
    {
      type: "input",
      name: "destinationDirectory",
      message: "Enter the destination directory where you want to clone the repository:",
      default: "Default", // Default to the 'Default' directory
    },
  ])
  .then((answers) => {
    const boilerplateName = answers.boilerplateName;
    const destinationDirectory = answers.destinationDirectory;

    // Construct the Git repository URL based on the provided boilerplate name
    const repositoryUrl = `https://github.com/itsdansi/${boilerplateName}.git`;

    // Clone the Git repository into the specified destination directory
    gitClone(repositoryUrl, destinationDirectory, null, function (err) {
      if (err) {
        console.error("Error:", err.message);
        process.exit(1);
      }

      console.log(`Repository cloned successfully to ${destinationDirectory}`);
      console.log("Installing necessary dependencies...");

      // Using 'exec' function to run shell commands
      // Additionally, install npm dependencies
      exec(`cd ${destinationDirectory} && npm install`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error installing dependencies: ${error.message}`);
          process.exit(1);
        }
        console.log("Dependencies installed successfully.");
      });
    });
  })
  .catch((error) => {
    console.error("Error:--->", error.message);
    console.log(error);
    process.exit(1);
  });
