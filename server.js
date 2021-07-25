const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors');
const path = require('path');
const app = express();
const config = require('config')

const node_env = config.get('node_env')

app.use(cors())

const PORT = process.env.PORT || 5000;

// Connect DB
connectDB()

// INIT MIDDLEWARE
app.use(express.json({ extended: false }))

// ROUTES
app.use("/api/users", require('./routes/users'))
app.use("/api/blogs", require('./routes/blogs'))
app.use("/api/auth", require('./routes/auth'))
app.use("/api/profile", require('./routes/profile'))



if (node_env === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send("Hello World")
    })
}


app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`)
})