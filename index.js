const fs = require('fs');
var generateHTML = require("./generateHTML.js");
var github = require('octonode');
var inquirer=require("inquirer")
var prompt = inquirer.createPromptModule();

const questions = [
{ 
type:"input",
name:"github",
message:"What is your GitHub Username?"
},
{
type:"list",
name:"color",
message:"what is your favorite color?",
choices:["green","blue","pink","red"]
}

];

function writeToFile(fileName, data) {
 
}

function init() {
prompt(questions).then((data)=>{
    console.log(data)
    var client = github.client();
    client.get('/users/'+ data["github"], {}, function (err, status, body, headers) {
        console.log(body); 
       var follower=body["followers"]
       var following=body["following"]
       var repos=body["public_repos"]
       html_text=generateHTML.generateHTML({color: data.color})
        
// write to a new file named page.html
fs.writeFile('page.html', html_text, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Html saved!');
});

      });
   
    
   // use data to request github api users input 
    // use data  to generate html function to dynamically render the users data
    // use libary to write a new pdf  
});
}
init();


