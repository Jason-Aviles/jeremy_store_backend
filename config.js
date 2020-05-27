// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoint: process.env.API_URL,
  masterKey: process.env.NODE_masterKey,
  port: process.env.PORT
};