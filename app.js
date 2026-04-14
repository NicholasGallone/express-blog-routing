const express = require('express')
const app = express()
const port = 3000

const postsRouter = require('./routers/posts');

const errorsHandler = require('./middlewares/errorsHandler');

const notFound = require('./middlewares/notFound');

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Benvenuto, ora puoi vedere i miei post");
})

app.use("/posts", postsRouter);

app.use(errorsHandler);

app.use(notFound);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

