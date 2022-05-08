const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
});

instance.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

module.exports = instance;
