var express = require('express');
var router = express.Router();

var estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

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

router.get('/edit/:id', function (req, res) {
  var id = req.params.id;
  global.db.findOne(id, (e, doc) => {
    if (e) { return console.log(e); }
    res.render('edit', { doc, title: "Editar Cadastro", estados });
  });
});

router.post('/edit', function (req, res, next) {
  const _id = req.body._id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  const customer = { nome, idade, uf };
  global.db.update(_id, customer, (err, result) => {
    if (err) { return console.log(err); }
    res.redirect('/');
  })
});

/* GET home page. */
router.get('/new', function (req, res, next) {
  res.render('new', { title: 'Novo Cadastro', estados });
});

/* POST new page. */
router.post('/new', function (req, res, next) {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.insert({ nome, idade, uf }, (err, result) => {
    if (err) { return console.log(err); }
    res.redirect('/');
  })
});
module.exports = router;
