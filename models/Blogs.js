const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    postImage: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    tags: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now
    },

}, {
    timeStamps: true
})

module.exports = Blogs = mongoose.model('blogs', BlogSchema)