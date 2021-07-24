const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')

const Profile = require('../models/Profile')
const User = require('../models/User')

// @route  GET api/profile/me
// @desc   Get Current User's Profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar', 'email']);

        if (!profile) {
            return res.status(400).json({ errors: [{ msg: 'There is no profile for this user. Please create it.' }] })
        }

        res.status(200).json({ profile })

    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route  POST api/profile
// @desc    Create or Update User profile
// @access Private
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        skills,
        youtube,
        github,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim());

    // Build Social Object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (github) profileFields.social.github = github;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {

        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }
            )

            return res.json(profile)
        }

        // CREATE
        profile = new Profile(profileFields);

        await profile.save()
        res.json(profile)

    } catch (err) {
        console.log(err.message)
        res.json({ errors: [{ msg: 'Server Error' }] })
    }
})


// @route  GET api/profile/:user_id
// @desc   Get Profile by ID
// @access Private
router.get('/:user_id', auth, async (req, res) => {
    try {

        const profile = await Profile.find({ user: req.params.user_id })
        console.log(profile)

        if (!profile) {
            return res.status(404).json({ errors: [{ msg: "User Not Found" }] })
        }
        res.json({ profile })

    } catch (err) {
        console.log(err.message)
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ errors: [{ msg: "User Not Found" }] })
        }
        res.status(500).send('Server Error')
    }
})

module.exports = router;
