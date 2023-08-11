const router = require("express").Router();
const User = require("./../models/User")
const bcrypt = require('bcrypt')


//Register
router.post("/register", async (req, res) => {
    console.log("method call from register to  ")
    try {
         const salt = await bcrypt.genSalt(10);
         const hashpwd = await bcrypt.hash(req.body.password,salt);
         const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpwd
        });
        const user = await newUser.save();

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error.message)
    }
})

//Login
router.post("/login",async (req,res)=>{
    
       

    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
          return res.status(400).json("Wrong Credentials");
        }
        
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
          return res.status(400).json("Wrong Credentials");
        }
        const {password ,...other} = user._doc;
        
        res.status(200).json({...other});
        
    } catch (error) {
        res.status(200).json(error);
        
    }
})


module.exports = router;
