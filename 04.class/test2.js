var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('test.sqlite');

const Enquirer = require('enquirer');
async function Dmemofunc(){
  const question = {
    type: 'select',
    name: 'body',
    message: 'Choose a note you want to delete:',
    choices: ['メモ１', '今日の日記', '晩ご飯のレシピ'],
  };
  const answer = await Enquirer.prompt(question);
  const body = answer.body;
  run('DELETE FROM memos WHERE body = ?', [body]);
};

function run(sql, params) {
	return new Promise((resolve, reject) => {
		db.run(sql, params, (err) => {
			if (err) reject(err);
			resolve();
		});
    console.log(params)
	});
}

Dmemofunc();