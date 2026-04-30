//const Posts = require('../data/singlePosts')

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
    
const { title, image } = req.body;

const sql = 'INSERT INTO db_blog (title, image) VALUES (?, ?)'

connection.query(
sql,
[title, image],
(err, results) => {
if (err) return res.status(500).json({ error: 'Failed to insert the post' });
res.status(201); 
console.log(results)
res.json({ id: results.insertId });
}
);
}

function update(req, res) {
const { id } = req.params;
const { title, image } = req.body;
connection.query(
'UPDATE db_blog SET title = ?, image = ? WHERE id = ?',
[title, image, id],
(err) => {
if (err) return res.status(500).json({ error: 'Failed to update pizza' });
res.json({ message: 'Post updated successfully' });
}
);
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
if (err) return res.status(500).json({ error: 'Failed to delete the post' });
res.sendStatus(204)
})}



module.exports = { index, show, store, update, modify, destroy }