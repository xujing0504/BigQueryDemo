const express = require("express");
const { BigQuery } = require("@google-cloud/bigquery");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// Create a client
const bigqueryClient = new BigQuery();

app.get("/licenses", async function (req, res, next) {
  const sqlQuery =
    "SELECT licenses.license AS license, count(*) AS total FROM `bigquery-public-data.github_repos.sample_repos` AS repo INNER JOIN `bigquery-public-data.github_repos.licenses` AS licenses ON repo.repo_name = licenses.repo_name GROUP BY license ORDER BY total DESC LIMIT 5";
  const [result] = await bigqueryClient.query({ query: sqlQuery });
  res.json({ result });
});
app.get("/languages", async function (req, res, next) {
  const sqlQuery =
    "SELECT arr.name AS LANGUAGE, sum(arr.bytes) AS total_bytes FROM `bigquery-public-data.github_repos.languages`, UNNEST(LANGUAGE) arr GROUP BY LANGUAGE ORDER BY total_bytes DESC LIMIT 10";

  const [result] = await bigqueryClient.query({ query: sqlQuery });
  res.json({ result });
});

app.listen(4000, () => console.log("Server up and running..."));
