#!/usr/bin/env node
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "please enter your project name",
    },
  ])
  .then((answers) => {
    console.log(answers, "answers");
    const dirPath = path.resolve(__dirname, 'dist');
    const temPath = path.resolve(__dirname, "templates");
    console.log(temPath);
    fs.readdir(temPath, (error, files) => {
      console.log(files, "files")
      files.forEach((file) => {
        ejs.renderFile(path.resolve(temPath, file), answers, (err, str) => {
          if (err) throw err;
          fs.writeFileSync(path.resolve(dirPath, file), str);
          // fs.writeFile()
          // str => Rendered HTML string
        });
      });
    });
  })
  .catch((error) => {});
