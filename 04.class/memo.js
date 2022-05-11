const Enquirer = require('enquirer');
var argv = require('minimist')(process.argv.slice(2));

if(argv.l){
  var sqlite = require('sqlite3').verbose();                                          
  var db = new sqlite.Database('test.sqlite');

  db.serialize(function() {
  db.each("SELECT * FROM students", function(err, row) {
    console.log(row.name + ":" + row.age);
  });
});

db.close();
}

else if(argv.r){
  (async ()=> {
    const question = {
      type: 'select',
      name: 'favorite',
      message: '好きな乗り物は？',
      choices: ['メモ１', '今日の日記', '晩ご飯のレシピ'],
    };
    const answer = await Enquirer.prompt(question);
    console.log(answer.favorite);
  })();
}

else if(argv.e){
  var fs = require('fs'); 

  // キーの入力待ち状態にする。
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  // 標準入力終了時のイベント処理
  process.stdin.on('end', function() {
      console.log('END!!');
  });

  // 入力された１行を読み込んだ時のイベント処理
  process.stdin.on('data', function(inputData) {
      // 末尾の改行を取り除く。
      var input = inputData.slice(0, -1);
      if (input == 'end') {
          // end が入力された場合、プロセスを終了する。
          process.exit(0);
      } else {
          console.log('Input: ' + input);
      }
  });

  // Ctrl + C が入力された場合のイベント処理
  process.on('SIGINT', function() {
      console.log('Ctrl+C!!');
      // プロセスを終了する。
      process.exit(0);
  });

  // プロセス終了時のイベント処理
  process.on('exit', function() {
      console.log('EXIT!!');
  });
}



  var sqlite = require('sqlite3').verbose();                                          
  var db = new sqlite.Database('test.sqlite');

  db.serialize(function() {

    // テーブルがなければ作成
    db.run('CREATE TABLE IF NOT EXISTS students(name TEXT, age INT)');
    if(argv.a){
      // プリペアードステートメントでデータ挿入
      var stmt = db.prepare('INSERT INTO students VALUES(?,?)');
      stmt.run(["Tanaka", 12]);
      stmt.run(["Sato", 13]);
      stmt.run(["Nakamura", 15]);
      stmt.finalize();
    }
    else if(argv.d){
      db.run('DELETE FROM students WHERE age = 15', err => {
        if (err) {
          return console.error(err.message);
        }
      });
    }
  });

  db.close();


