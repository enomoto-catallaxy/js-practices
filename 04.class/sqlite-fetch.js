var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');



db.serialize(() => {
    db.run('CREATE TABLE testdb (name TEXT)');

    var insertData = db.prepare('INSERT INTO testdb VALUES (?)');
    insertData.run(['パトカー']);
    insertData.run(['救急車']);
    insertData.run(['消防車']);

    insertData.finalize();

    // 結果を取得
    db.get('SELECT * FROM testdb', (err, row) => {
        if (err) {
            console.error(err.message);
        }
        row.id = 1;
        console.log(`${row.id} : ${row.name}`);
    });
});

// データベースを閉じる
db.close();

const Enquirer = require('enquirer');

(async ()=> {
  const question = {
    type: 'select',
    name: 'name',
    message: '好きな乗り物は？',
    choices: ['パトカー', '救急車', '消防車'],
  };
  const answer = await Enquirer.prompt(question);
  let age = answer.name
  console.log(`僕も${age}が好きだよ`);
})();