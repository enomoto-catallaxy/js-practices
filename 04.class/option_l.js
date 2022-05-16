const sqlite = require('sqlite3').verbose();                                          
const db = new sqlite.Database('idtest2.sqlite');

class optionL{
  listBodeys(){
    db.each("SELECT * FROM bodys", function(err, row) {
      if (err) {
        throw err;
      }
      console.log(`${row.body.split(' ')[0]}`);
    });
  }
}

module.exports = optionL;
