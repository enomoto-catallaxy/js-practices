const sqlite = require('sqlite3').verbose();                                          
const db = new sqlite.Database('test.sqlite');

class optionL{
  index(){
    db.each("SELECT * FROM memos", function(err, row) {
      if (err) {
        throw err;
      }
      console.log(row.body);
    });
  }
}

var option = new optionL;
option.index();
