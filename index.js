const fs = require('fs');
var pdf = require('html-pdf');
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
    // console.log(data)
    var client = github.client();
    client.get('/users/'+ data["github"], {}, function (err, status, body, headers) {
        // console.log(body); 
       var follower=body["followers"]
       var following=body["following"]
       var repos=body["public_repos"]
       var bio =body["bio"]
       var location =body["location"]
       var name =body["name"]
       var company = body["company"]
       var blog =body["blog"]
       var githubprofile =body["url"]
       var image =body["avatar_url"]
       data.followers=follower
       data.following=following
       data.repos=repos
       data.bio=bio
       data.location=location
       data.name=name
       data.company=company
       data.blog=blog
       data.githubprofile=githubprofile
       data.image = image
       html_text=generateHTML.generateHTML(data)
        
// write to a new file named page.html
fs.writeFile('page.html', html_text, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    // console.log('Html saved!');
var html = fs.readFileSync('./page.html', 'utf8');
var options = { format: 'Letter' };
pdf.create(html, options).toFile('./page.pdf', function(err, res) {
  if (err) return console.log(err);
//   console.log(res); // { filename: '/app/businesscard.pdf' }
});
});

      });
   
    
   // use data to request github api users input 
    // use data  to generate html function to dynamically render the users data
    // use libary to write a new pdf  
});
}
init();


