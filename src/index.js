const { Command } = require("commander");
const Table = require("cli-table3");

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
    let { startDate, endDate, limit } = options;

    // Validate dates
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (startDate && !dateRegex.test(startDate)) {
      console.error("Invalid start date format. Use YYYY-MM-DD.");
      process.exit(1);
    }

    if (endDate && !dateRegex.test(endDate)) {
      console.error("Invalid end date format. Use YYYY-MM-DD.");
      process.exit(1);
    }

    if (!startDate) startDate = "2023-01-01";
    if (!endDate) endDate = new Date().toISOString().split("T")[0];

    const topProjects = await getProjects(startDate, endDate, limit);

    if (!topProjects) {
      console.log(`No projects found between ${startDate} and ${endDate}.`);
      return;
    }

    console.log(
      `Top ${limit} starred projects from ${startDate} to ${endDate}:`
    );

    // Create a new table
    const table = new Table({
      head: ["#", "Project Name", "Stars", "Link", "Created At"],
      colWidths: [4, 35, 10, 50, 25],
    });

    topProjects.forEach((project, index) => {
      table.push([
        index + 1,
        project.full_name,
        project.stargazers_count,
        project.html_url,
        project.created_at,
      ]);
    });

    console.log(table.toString());
  });

program.parse();
