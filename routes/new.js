var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('new', { title: 'Novo Cadastro' });
});

/* POST new page. */
router.post('/', function (req, res, next) {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.insert({ nome, idade, uf }, (err, result) => {
    if (err) { return console.log(err); }
    res.redirect('/');
  })
});

module.exports = router;