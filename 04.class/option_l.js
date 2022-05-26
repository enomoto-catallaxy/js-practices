class OptionL {
  listBodeys (db) {
    db.each('SELECT * FROM memos', function (err, row) {
      if (err) {
        throw err
      }
      console.log(`${row.body.split(' ')[0].split('　')[0]}`)
    })
  }
}

module.exports = OptionL
