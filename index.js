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
    // use data to re0guest github api users input 
    // use to generate html fuction to dymalically render the users data
    // use libary to write a new pdf  
});
}
init();
// 