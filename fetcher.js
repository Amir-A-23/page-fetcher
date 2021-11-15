const request = require('request');
const fs = require('fs');


console.log('Please enter a url to fetch data from and a local file path to save that dat to: \n');
console.log('For example: www.example.edu followed by ./index.html\n');
const args = process.argv.slice(2);

//const localPath = './index.html';
//const urlToFetch = 'www.example.edu';
const urlToFetch = args[0];
const localPath = args[1];

//console.log(">>>>>>>>>>>>>>>>>>>", localPath, urlToFetch);

request(urlToFetch, (error, response, body) => {
  if(!error) {
    if(!response.statusCode === 200) {
      //relevent error
      console.log(`Error: status code is not 200, Status Code:  ${response.statusCode}`);
    }
    if(!body) {
      //relevent error
      console.log('Error: the body is empty.');
    }
    fs.writeFile(localPath, body, (error) => {
      if(!error) {
        fs.stat(localPath, (error, stats) => {
          if(!error) {
            console.log(`Fetched & saved ${stats.size} bytes to ${localPath}.`);
          } else {
          console.log('could not obtain file size');
          }
        });
      } else {
      console.log(`Could not save to ${localPath}`, error);
      }
    });
  } else {
  console.log('Error: failed to access and retrieve from the given url.', error);
  }
});
