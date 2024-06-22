const { Command } = require("commander");
const { getProjects } = require("../api/getProjects");
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
  .option("-s, --start-date <date>", "start date (YYYY-MM-DD)")
  .option("-e, --end-date <date>", "end date (YYYY-MM-DD)")
  .option("-l, --limit <number>", "number of results to return", "10")
  .action(async (options) => {
    const { startDate, endDate, limit } = options;
    const topProjects = await getProjects(
      startDate || "2023-01-01",
      endDate || new Date().toISOString().split("T")[0],
      limit
    );

    console.log(topProjects);
  });

program.parse();
