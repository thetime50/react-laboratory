/* eslint-disable unicorn/prefer-module, @typescript-eslint/no-var-requires */
const path = require('node:path');

const isDevelopment = process.env.NODE_ENV !== 'production';
const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;
const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 9000;

module.exports = {
  isDev: isDevelopment,
  PROJECT_PATH,
  PROJECT_NAME,
  SERVER_HOST,
  SERVER_PORT,
};
