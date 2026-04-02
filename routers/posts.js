const express = require('express')

const router = express.Router();

const Posts = require('../data/singlePosts')

const postsController = require('../controllers/postsControllers')


router.get('/', postsController.index)

router.get('/:id', postsController.show)

router.post('/', postsController.store)

router.put('/:id', postsController.update);

router.patch('/:id', postsController.modify);

router.delete('/:id', postsController.destroy);

module.exports = router;