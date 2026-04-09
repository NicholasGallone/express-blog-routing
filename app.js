const express = require('express')
const app = express()
const port = 3000

const postsRouter = require('./routers/posts');

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Benvenuto, ora puoi vedere i miei post");
})

app.use("/posts", postsRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

