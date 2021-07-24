const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator/check')
const config = require('config')
const auth = require('../middleware/auth')

// GETTING USER SCHEMA
const User = require('../models/User')

// @route  GET api/auth
// @desc   Get logged in User
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({ user: user })
    } catch (err) {
        console.log(err.message)
        res.send({ err: "Server Error" })
    }
})

// @route  POST api/auth
// @desc   Auth User & get token
// @access PUBLIC
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }



        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000,
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

    } catch (err) {
        console.log(err.message)
        res.send('Error')
    }
})


module.exports = router