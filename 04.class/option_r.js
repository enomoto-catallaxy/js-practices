var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('idtest2.sqlite');
const Enquirer = require('enquirer');
const choices = [];

class optionR{
  getRecords() {
    return new Promise((resolve, reject) => {
      db.serialize(() =>{
        db.all("SELECT * FROM bodys", function(err, row) {
          if (err) return reject(err)
          resolve(row)
        })
      })
    })
  }

  async returnRecords(){ //レコードを要素に持つ配列を返す OK
    const records = await this.getRecords();
    const newRecords = [];
    records.forEach(element => {
      newRecords.push(element)
    })
    console.log(newRecords);
  }

  async allchoices(){ //choicesとして各レコードのbodyカラムのみの配列を返す　OK
    const gottenRecords = await this.getRecords();
    gottenRecords.forEach(element => {
      choices.push(element)
    })
    const NumberOfObject = Object.keys(choices).length
    for (let i = 0; i < NumberOfObject ; i++) {
      choices[i] = choices[i].body
    };
    return choices;
  }

  async referBodys(){
    let BodyTemps = await this.allchoices();
    let IncludeSpaceBodys = []
    IncludeSpaceBodys = IncludeSpaceBodys.concat(BodyTemps)
    for (let i = 0; i < BodyTemps.length ; i++) {
      BodyTemps[i] = BodyTemps[i].split(' ')[0]
    };
    const question = {
      type: 'select',
      name: 'body',
      message: 'Choose a note you want to refer:',
      choices: BodyTemps
    };
    const answer = await Enquirer.prompt(question);
    const NotIncludigSpaceInBody = answer.body;
    for (let i = 0; i < IncludeSpaceBodys.length; i++) {
      if(IncludeSpaceBodys[i].includes(NotIncludigSpaceInBody)){
        console.log(IncludeSpaceBodys[i])
      }
    }
  }
}

module.exports = optionR;
