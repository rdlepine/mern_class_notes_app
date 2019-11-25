const express = require('express')
const cluster = require('cluster')
const mongoose = require('mongoose')
const notesRouter = require('./routes/note.js')
const os = require('os')
const PORT = process.env.PORT | 3000
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/notes'
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(DATABASE_URL)
const db = mongoose.connection
db.once('open', () => console.log('Connected to database'))

    
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use('/api/notes', notesRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))