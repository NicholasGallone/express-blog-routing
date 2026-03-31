const express = require('express')

const router = express.Router();

const posts = require('../data/singlePosts')

router.get( '/', function (req,res){
   const tuttiIpost = {
    numeroPost : posts.length,
    listaDeiPost : posts
   }
   res.json(tuttiIpost);
});

router.get('/:id', function (req, res){
    res.send('dettagli del post' + req.params.id)
})

router.post('/', function (req, res) {
    res.send('Creazione nuovo post');
});

router.put('/:id', function (req, res) {
    res.send('Modifica il post interamente' + req.params.id);
});

router.patch('/:id', function (req, res) {
    res.send('Modifica il post parzialmente' + req.params.id);
});

router.delete('/:id', function (req, res) {
    res.send('Eliminazione del post ' + req.params.id);
});

module.exports = router;