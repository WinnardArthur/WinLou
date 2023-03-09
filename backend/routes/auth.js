const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) {
            console.log('user already exists')
            return res.status(500).json({message: 'Sorry user already exists'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,  
            password: hashedPassword,
            profile: req.body.profile
        })

        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}) 


// LOGIN
router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({$or: [{username: req.body.username}, {email: req.body.username}]});

        console.log('user', user)

        if(!user) return res.status(400).json({message: "Wrong credentials"})

        const validated = await bcrypt.compare(req.body.password, user.password)
        if(!validated) return res.status(400).json("Wrong credentials") 

        const {password, ...others} = user._doc
        
        res.status(200).json(others)
    } catch (err) {
        coonsole.log(err)
         res.status(500).json(err)
    }
})


module.exports = router;