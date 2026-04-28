const Posts = require('../data/singlePosts')

const connection = require('../data/db')

function index(req, res) {

    const sql = 'SELECT * FROM db_blog';

connection.query(sql, (err, results) => {
if (err) return res.status(500).json({ error: 'Database query failed' });
res.json(results);

})};



function show(req, res) {


const id = req.params.id
const sql = 'SELECT * FROM db_blog WHERE id = ?';

connection.query(sql, [id], (err, results) => {
if (err) return res.status(500).json({ error: 'Database query failed' });
if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
res.json(results[0])

})};



function store(req, res) {
  // res.send('Creazione nuovo post');

   const nuovoId = Date.now();

    const nuovoPost = {
        id: nuovoId,
        titolo: req.body.titolo,
        immagine: req.body.immagine,
        ingredienti: req.body.ingredienti
    }

    Posts.push(nuovoPost);

    console.log(Posts);


    res.status(201);

    res.json(nuovoPost);

}

function update(req, res) {

    const id = parseInt(req.params.id)
    
    const postDaAggiornare = Posts.find(post => post.id === id);

   
    if (!postDaAggiornare) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }


    postDaAggiornare.titolo = req.body.titolo;
    postDaAggiornare.immagine = req.body.immagine;
    postDaAggiornare.ingredienti = req.body.ingredienti;

   
    console.log(Posts)

    
    res.json(postDaAggiornare);
}


function modify(req, res) {

 const id = parseInt(req.params.id)

 const postDaModificare = Posts.find(post => post.id === id);

    
    if (!postDaModificare) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Post non trovato"
        })
    }

    const postInviato = req.body;

    
 postInviato.titolo ? postDaModificare.titolo = postInviato.titolo : postDaModificare.titolo = postDaModificare.titolo

 postInviato.immagine ? postDaModificare.immagine = postInviato.immagine : postDaModificare.immagine = postDaModificare.immagine

 postInviato.ingredienti ? postDaModificare.ingredienti = postInviato.ingredienti : postDaModificare.ingredienti = postDaModificare.ingredienti

    
    console.log(Posts)

    
    res.json(postDaModificare);
}


function destroy(req, res) {
    const { id } = req.params;

connection.query('DELETE FROM db_blog WHERE id = ?', [id], (err) => {
if (err) return res.status(500).json({ error: 'Failed to delete pizza' });
res.sendStatus(204)
})}



module.exports = { index, show, store, update, modify, destroy }