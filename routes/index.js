var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  global.db.findAll((e, docs) => {
    if (e) { return console.log(e); }
    res.render('index', { docs });
  })
})

/* GET delete page. */
router.get('/delete/:id', function (req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
    if (e) { return console.log(e); }
    res.redirect('/');
  });
});

module.exports = router;
