const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const app = express();

app.use(cors())

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hello World")
})

// Connect DB
connectDB()

// INIT MIDDLEWARE
app.use(express.json({ extended: false }))

// ROUTES
app.use("/api/users", require('./routes/users'))
app.use("/api/blogs", require('./routes/blogs'))
app.use("/api/auth", require('./routes/auth'))
app.use("/api/profile", require('./routes/profile'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"))
}

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`)
})