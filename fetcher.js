const request = require('request');
const fs = require('fs');
const readline = require('readline');

const urlPathArr = process.argv.slice(2)
const url = urlPathArr[0];
const filePath = urlPathArr[1];



request(url, (err,response,body) => {
  if (err) console.log('there is an error in the request:', err);
  else if (response.statusCode !== 200) {
    console.log(`${response.statusCode}: ${response.statusMessage}`);
  }
  else {

    const writeFile = () => {
      fs.writeFile(filePath, body, error => {
        if (error) console.log('there is an error with writefile:', error);
        else {
        const fileSize = fs.statSync(filePath).size;
        console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}.`)
        }
      });
    };
    
    fs.access(filePath, fs.constants.F_OK, err => {
      if(err) writeFile() ;
      else {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        rl.question('File exists. Do you wish to overwrite it?  Y \n:' , ans => {
          if (ans === 'Y') {
            writeFile();
            rl.close()
          } else rl.close()
        })
      } 
    })
  }

})