const Enquirer = require('enquirer');
async function agefunc(){
  const question = {
    type: 'select',
    name: 'number',
    message: '好きな番号は？',
    choices: ['12', '13', '15'],
  };
  const answer = await Enquirer.prompt(question);
  var age = parseInt(answer.number)
  return age;
};
async function show(){
  const value = await agefunc()
  console.log(value);
};

show();