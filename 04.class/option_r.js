var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('test.sqlite');
const Enquirer = require('enquirer');

class optionR{
  async referBodys(){
    const question = {
      type: 'select',
      name: 'body',
      message: 'Choose a note you want to select:',
      choices: ['メモ１', '今日の日記', '晩ご飯のレシピ'],
    };
    const answer = await Enquirer.prompt(question);
    const body = answer.body;
    this.run('SELECT body FROM memos WHERE body = ?', [body]);
  };

  run(sql, params) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err) => {
        if (err) reject(err);
        resolve();
      });
      console.log(params)
    });
  }
}

let option = new optionR;
option.referBodys();