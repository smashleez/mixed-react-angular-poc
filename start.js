// TODO: change ping -n 53 to a proper promise chain that runs container after all others spin up
const concurrently = require('concurrently');

concurrently(['cd angularjs-app2 && npm run start',
  'cd angular-app && npm start',
  'cd navbar && npm run start',
  'cd react-app && npm run start',
  'ping -n 53 127.0.0.1 >nul && cd container && npm start']);
