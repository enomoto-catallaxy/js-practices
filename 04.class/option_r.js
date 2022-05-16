const Enquirer = require('enquirer');
const question = {
  type: 'select',
  name: 'body',
  message: 'Choose a note you want to refer:',
};

class optionR{
  getRecords(db) {
    return new Promise((resolve, reject) => {
      db.serialize(() =>{
        db.all("SELECT * FROM bodys", function(err, row) {
          if (err) return reject(err)
          resolve(row)
        })
      })
    })
  }

  async getChoices(db){
    const choices = [];
    const gottenRecords = await this.getRecords(db);
    gottenRecords.forEach(element => choices.push(element))
    for (let i = 0; i < Object.keys(choices).length ; i++) {
      choices[i] = choices[i].body
    };
    return choices;
  }

  async referBodys(db){
    let alternatives = await this.getChoices(db);
    let IncludeSpaceBodys = []
    IncludeSpaceBodys = IncludeSpaceBodys.concat(alternatives)
    for (let i = 0; i < alternatives.length ; i++) {
      alternatives[i] = alternatives[i].split(' ')[0].split('　')[0]
    };
    question.choices = alternatives;
    const answer = await Enquirer.prompt(question);
    for (let i = 0; i < IncludeSpaceBodys.length; i++) {
      if(IncludeSpaceBodys[i].includes(answer.body)){
        console.log(IncludeSpaceBodys[i]);
      }
    }
  }
}

module.exports = optionR;
