const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require('bcrypt');

//Update
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json(updatedUser);

        } catch (error) {
            return res.status(500).json(error)

        }

    }
    else {
        return res.status(401).json("You can Update Only account");
    }
})

//delete

router.delete("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {
        try {
       const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id);
                return res.status(200).json("User has been Delete");            
               } catch (error) {
            return res.status(500).json(error); 
               }

        } catch (error) {
                return res.status(404).json("User Not Found")
        }



    }
    else {
        return res.status(401).json("You can Delete Only account");

    }

})



// Get User

router.get("/:id",async(req,res)=>{
    try {
const user = await User.findById(req.params.id);
const {password,...others}= user._doc;

res.status(200).json({...others});
;
        
    } catch (error) {
        return res.status(500).json("no user found");
        
    }
})

module.exports = router;