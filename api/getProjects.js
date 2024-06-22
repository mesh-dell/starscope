const axios = require("axios");

async function getProjects(startDate, endDate, limit) {
  try {
    const query = `created:${startDate}..${endDate}`;
    const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=${limit}`;

    const response = await axios(url);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching data from github: ", error.message);
  }
}

exports.getProjects = getProjects;
