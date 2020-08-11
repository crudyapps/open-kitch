const fs = require('fs');
fs.writeFileSync(`${__dirname}/dist/config.json`, `{ "apiBaseUrl": "https://open-kitch.kahgeh.com" }`);