const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

const connectDB = async () => {

    try {
        const response = await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })

        if (response) { console.log('MongoDB connected...') }
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB