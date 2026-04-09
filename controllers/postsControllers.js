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