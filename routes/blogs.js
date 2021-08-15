const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')
const auth = require('../middleware/auth')
const User = require('../models/User')
const Blogs = require('../models/Blogs')
const path = require('path');
const Profile = require('../models/Profile')

// @route  POST api/blogs
// @desc   Add new Blogs
// @access Private
router.post('/', [auth, [
    check('text', 'Text is Required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Blogs({
            title: req.body.title,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
            postImage: req.body.postImage
        })

        const post = await newPost.save()
        res.json(post)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route  GET api/blogs
// @desc   Get All blogs
// @access Public
router.get('/', async (req, res) => {
    try {

        const post = await Blogs.find().sort({ date: -1 })

        res.json({ post })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route  GET api/blogs/:id
// @desc   Get blogs by ID
// @access Public
router.get('/:id', async (req, res) => {
    try {

        const post = await Blogs.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] })
        }

        res.json({ post })

    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] })
        }
        res.status(500).send('Server Error')
    }
})

// @route  GET api/blogs/user/:user_id
// @desc   Get blogs by USER ID
// @access Private
router.get('/user/:user_id', auth, async (req, res) => {
    try {

        const post = await Blogs.find({ user: req.params.user_id })

        if (!post) {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] })
        }
        res.json({ post })

    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] })
        }
        res.status(500).send('Server Error')
    }
})

// @route  DELETE api/blogs/:id
// @desc   Delete a BLogs
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {

        const post = await Blogs.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] })
        }

        // CHECK USER
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ errors: [{ msg: "User not Authorized " }] })
        }

        await post.remove();

        res.json({ msg: 'Post Removed' })

    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ errors: [{ msg: "Post Not Found" }] })
        }
        res.status(500).send('Server Error')
    }
})

// @route  PUT api/blogs/like/:id
// @desc   Like a Blog
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try {

        const post = await Blogs.findById(req.params.id)

        //Check Post Already be liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ errors: [{ msg: 'Post Already Liked' }] })
        }

        post.likes.unshift({ user: req.user.id })

        await post.save()

        res.json(post.likes)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route  PUT api/blogs/unlike/:id
// @desc   UnLike a Blog
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {

        const post = await Blogs.findById(req.params.id)

        //Check Post Already be liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ errors: [{ msg: 'Post has not been Liked yet' }] })
        }

        // Get Remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)

        await post.save()

        res.json(post.likes)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route  POST api/blogs/comments/:id
// @desc   Add Comments
// @access Private
router.post('/comments/:id', [auth, [
    check('text', 'Text is Required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Blogs.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment)
        await post.save()

        res.json(post.comments)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route  DELETE api/blogs/comments/:id/:comments_id
// @desc   Delete Comments
// @access Private
router.delete('/comments/:id/:comment_id', auth, async (req, res) => {

    try {
        const post = await Blogs.findById(req.params.id);

        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        if (!comment) {
            return res.status(404).json({ errors: [{ msg: 'Comment Doesn\'t Exist' }] })
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ errors: [{ msg: 'User not Authorized' }] })
        }

        // Get Remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

        post.comments.splice(removeIndex, 1)

        await post.save()

        res.json(post.comments)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router