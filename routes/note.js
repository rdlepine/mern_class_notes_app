const express = require('express')
const Note = require('../models/note.js')

const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const notes = await Note.find()
        res.json(notes)
        
    } catch(err) {
        res.send(400).json({err:err})
    }
})

router.get('/:id', getNote, (req, res) => {

    res.json(res.note)

})

router.post('/', async (req, res) => {
    const note = new Note ({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
    })
  
    console.log(note)
    try {
        const newNote = await note.save()
        res.status(201).json(newNote)

    } catch (err) {
        res.status(400).json({err: err})   
    }
})

router.delete('/:id', getNote, async (req, res) => {
    
    try {
        await res.note.remove()
        res.json({message: 'Note Deleted.'})
    } catch (err) {
        res.status(500).json({message: 'Coulnd not find note'})
    }

})

router.patch('/:id', getNote, async (req, res) => {

    if(req.body.noteTitle !== null) {
        res.note.noteTitle = req.body.noteTitle
    }

    if(req.body.noteDescription !== null) {
        res.note.noteDescription = req.body.noteDescription
    }

    try {
        const updatedNote = await res.note.save()
        res.json(updatedNote)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Note not updated'})
    }
})


async function getNote(req, res, next) {
    let note
    try {
        note = await Note.findById(req.params.id)
        if(note === null) {
            return res.status(404).json({message: "Note not found"})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Server Error"})
    }

    res.note = note
    next()
}

module.exports = router
