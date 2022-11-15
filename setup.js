"use strict";
const db = require("./");
const inquirer = require("inquirer");
const chalk = require("chalk");
const debug = require("debug")("platziverse:db:setup");
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
const prompt = inquirer.createPromptModule();
function handleFatalError(error) {
  console.error(`${chalk.red("[FATAL ERROR]")} ${error.message}`);
  console.error(error.stack);
  process.exit(1);// marca error en el procesos y lo detiene
}
async function setup() {
  /**
   * con permite interactuar con la consola y obtener la respuesta
   */
  const answer = await prompt([
    {
      type: "confirm",
      name: "setup",
      message: "this will destroy your database, are you sure?",
    },
  ]);
  if (!answer.setup) {
    /**
     * Al ejecutar un return la ejecución de la función 
     * se detiene y no sigue con el código 
     */
    return console.log("nothing happened!!");
  }
  const config = {
    database: DB_NAME || "platziverse",
    username: DB_USER || "nico",
    password: DB_PASS || "admin123",
    host: DB_HOST || "localhost",
    dialect: "postgres",
    logging: (s) => {
      debug(s);
    },
    setup: true,//Funcionan para validar si se quiere crear una nueva base de datos 
  };
  await db(config).catch(handleFatalError);
  console.log("Success");
  process.exit(0); // hace que el procesos siga con éxito
}
setup();
