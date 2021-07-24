const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    bio: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    education: {
        school: {
            type: String,
        },
        degree: {
            type: String,
        },
        fieldofstudy: {
            type: String,
        },
        from: {
            type: Date,
        },
        to: {
            type: Date,
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
        },
    },
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        github: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)