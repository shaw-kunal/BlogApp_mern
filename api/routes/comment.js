const Comment = require('../models/Comment');

const router = require('express').Router();


// to create the comment
router.post('/', async (req, res) => {
    console.log("one comment come")
    try {
        const { postId, username, text,profilePic} = req.body;
        const newComment = new Comment({
            postId,
            username,
            text,
            profilePic                                              
        })

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);

    } catch (error) {
        res.status(500).json(error);

    }
})


// to retrival of comment
router.get('/:postId', async (req, res) => {
    console.log("fetch comment")
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ postId }).sort({ createdAt: 'desc' })
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

})


// delete the comment
router.delete('/:commentId',async(req,res)=>{
    try {
        
        const comment  = await Comment.findById(req.params.commentId)
        if(comment == null)
        {
            return res.status(404).json({message:"comment not found"})
        }
        
        
    } catch (error) {
  return res.status(500).json({message:"internal server error"})
        
    }
})

module.exports = router