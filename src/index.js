const { Command } = require("commander");
const program = new Command();

program
  .name("Starscope")
  .description(
    "CLI application that optionally takes two dates and prints the most starred GitHub projects in that date range."
  )
  .version("1.0.0");

program
  .command("starscope")
  .description("Print the most starred GitHub projects in a date range.")
  .argument(
    "<start-date>",
    "Defines the beginning of the time period for which to retrieve starred project data"
  )
  .argument(
    "<end-date>",
    "Defines the end of the time period for which to retrieve starred project data"
  )
  .option("--first", "display just the first project")
  .action((startDate, endDate) => {});

program.parse();
