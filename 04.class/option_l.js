class optionL{
  listBodeys(db){
    db.each("SELECT * FROM bodys", function(err, row) {
      if (err) {
        throw err;
      }
      console.log(`${row.body.split(' ')[0].split('　')[0]}`);
    });
  }
}

module.exports = optionL;
