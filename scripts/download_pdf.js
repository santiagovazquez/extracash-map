const fs = require('fs');
const _ = require('lodash');
const fetch = require('node-fetch');
const constants = require('./constants');

const file = fs.createWriteStream(constants.PDF_FILE);

fetch(constants.URL_PDF)
  .then(res => {
    res.body.pipe(file)
      .on('finish', () => {
        file.close();
        process.exit();
      });

    file.on('error', (err) => { // Handle errors
      fs.unlinkSync(constants.PDF_FILE); // Delete the file async. (But we don't check the result)
      console.error(err);
      process.exit(1);
    });
  })
  .catch(e => {
    fs.unlinkSync(constants.PDF_FILE);
    console.error(e);
    process.exit(1);
  });


