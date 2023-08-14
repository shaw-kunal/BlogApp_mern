const router = require('express').Router();
const Post = require('../models/Post');


// create Post
router.post('/', async (req, res) => {
    console.log("create post came")
    const newPost = new Post(req.body);
    const title = req.body.title;

    try {

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        const existingData = await Post.findOne({ title });

        if (existingData) {
            return res.status(400).json({ error: 'Use Different Title' });
        }
    }
})
//delete Post 
router.delete("/:id", async (req, res) => {
    // finrst find  is any post is with id or not if not then internal server error
    // now check is the person is valid or not
    // after that delete the post

    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {

            try {
                await Post.findByIdAndDelete(req.params.id);

                res.status(200).json("post delete Successfully");

            } catch (error) {

                return res.status(500).json(error);

            }

        } else {
            return res.status(401).json("You can delete only your post");
        }

    } catch (error) {
        return res.status(500).json({ "message": "no post with this id" });

    }


})

//update Post

router.put("/:id", async (req, res) => {
    try {
        // find the post using id;
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,
                    { $set: req.body }, { new: true });

                return res.status(201).json(updatedPost);


            } catch (error) {
                return res.status(200).json(error);
            }

        } else {
            return res.status(401).json("You can update only Your Post");
        }

    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });


    }
})


//get Post

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error);

    }
})


//Get All Post
router.get("/", async (req, res) => {
    console.log("post request come from home page")
    const username = req.query.user;
    const catName = req.query.cat;

    try {

        let posts;
        if (username) {
            posts = await Post.find({ username: username });
        }
        else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            });
        }
        else {
            posts = await Post.find();
        }

        res.status(200).json(posts);
    } catch (error) {

    }

})

router.post("/:id/like", async (req, res) => {
    console.log('Request like came')
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status.status(404).json({ message: "post not found" });
        }

        post.like.push(req.body.username);
        console.log(post)
        const updatePost = await post.save();
        const numberOfLikes = updatePost.like.length;
        console.log(updatePost)
        console.log(numberOfLikes);
        res.status(200).json({ post: updatePost, numberOfLikes });


    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// remove like from the post
router.post("/:id/unlike", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        post.like = post.like.filter(username => username !== req.body.username)
        const updatedPost = await post.save();

        const numberOfLikes = updatedPost.like.length;
        res.status(200).json({
            post: updatedPost,
            numberOfLikes
        })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})


// add heart into db
router.post("/:id/heart", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status.status(404).json({ message: "post not found" });
        }

        post.heart.push(req.body.username);
        const updatePost = await post.save();
        res.status(200).json(updatePost);

    } catch (error) {

        res.status(500).json("internal server error")
    }

})

// router removeheart
router.post("/:id/removeheart", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post.heart = post.heart.filter(username => username !== req.body.username)
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }

})
module.exports = router;