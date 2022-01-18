const express = require('express');
const Post = require('../models/Post');
const router = require('./auth');

// CREATE A POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE A POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body 
                }, { new: true } )
                res.status(200).json(updatedPost)
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("You can update only your post!")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
 
// DELETE A POST
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET A POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET ALL POSTS
router.get('/', async (req, res) => {
    const username = req.query.user;
    const category = req.query.category;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (category) {
            posts = await Post.find({
                category: {
                    $in: [category] 
                }
            })
        } else {
            posts = await Post.find();
        }

        res.status(200).json(posts)   
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;