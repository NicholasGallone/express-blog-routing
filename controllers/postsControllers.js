const Posts = require('../data/singlePosts')


function index(req, res) {

    let filtroPost = Posts;

    if (req.query.ingrediente) {
        filtroPost = Posts.filter(post=> post.ingredienti.includes(req.query.ingrediente));
    }

    const tuttiIpost = {
        numeroPost: filtroPost.length,
        listaDeiPost: filtroPost
    }

    res.json(tuttiIpost);
}



function show(req, res) {
    const id = parseInt(req.params.id)

    const postTrovato = Posts.find(post => post.id === id);

    if (!postTrovato) {

        res.status(404)

        return res.json({
            errore: "Not Found",
            messaggio: "Post non trovato"
        })
    }

    res.json(postTrovato);
}


function store(req, res) {
    res.send('Creazione nuovo post');
}

function update(req, res) {
    res.send('Modifica integrale del post' + req.params.id);
}


function modify(req, res) {
    res.send('Modifica parziale del post' + req.params.id);
}


function destroy(req, res) {
    
    const id = parseInt(req.params.id)

    const singoloPost = Posts.find(post => post.id === id);

    
    if (!singoloPost) {

        res.status(404);

        return res.json({
            status: 404,
            errore: "Not Found",
            messaggio: "Post non trovata"
        })
    }

    Posts.splice(Posts.indexOf(singoloPost), 1);

    console.log(Posts);

    res.sendStatus(204)
}


module.exports = { index, show, store, update, modify, destroy }