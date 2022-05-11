var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE testdb2 (id INTEGER, name TEXT, age INTEGER)');
    var insertData = db.prepare('INSERT INTO testdb2 VALUES (?, ?, ?)');
    insertData.run([1, 'Bob', 25]);
    insertData.run([2, 'Kevin', 35]);
    insertData.run([3, 'Tom', 45]);
    insertData.finalize();

    // レコードを削除
    db.run('DELETE FROM testdb2 WHERE id = 3', err => {
      if (err) {
          return console.error(err.message);
      }
  });

    DisplayTable(db);
});

db.close();

function DisplayTable(db) {
    db.all("SELECT * FROM testdb2", (err, rows) => {
        if (err) {
            console.error(err.message);
        }

        rows.forEach(row => {
            console.log(`${row.id} : ${row.name} : ${row.age}`);
        });
    });
}