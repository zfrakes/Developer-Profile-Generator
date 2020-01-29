const fs = require('fs');
const pdf = require('html-pdf');
const generateHTML = require("./generateHTML.js");
const github = require('octonode');
const inquirer=require("inquirer")
const prompt = inquirer.createPromptModule();

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
    const client = github.client();
    client.get('/users/'+ data["github"], {}, function (err, status, body, headers) {
        // console.log(body); 
       const follower=body["followers"]
       const following=body["following"]
       const repos=body["public_repos"]
       const bio =body["bio"]
       const location =body["location"]
       const name =body["name"]
       const company = body["company"]
       const blog =body["blog"]
       const githubprofile =body["url"]
       const image =body["avatar_url"]
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
const html = fs.readFileSync('./page.html', 'utf8');
const options = { format: 'Letter' };
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


