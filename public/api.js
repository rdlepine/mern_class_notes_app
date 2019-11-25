const getButton = document.getElementById('notes_get_form')
const findButton = document.getElementById('notes_find_form')
const postButton = document.getElementById('notes_post_form')
const delButton = document.getElementById('user_delete_form')
const updateButton = document.getElementById('note_update_form')

getButton.addEventListener('submit', getRequest)
findButton.addEventListener('submit', findRequest)
postButton.addEventListener('submit', getPost)
delButton.addEventListener('submit', deletePost)
updateButton.addEventListener('submit', updatePost)

function getRequest(event) {
     event.preventDefault()
    fetch(`/api/notes/`).then( (response) => {
        return response.json()
    }).then( (data) => {
        document.getElementById('results').innerHTML = ""
        for(let i in data) {
            document.getElementById('results').innerHTML += data[i].noteTitle + '<br />'
        }

        console.log(('data', data))
    })

}


function findRequest(event) {
    event.preventDefault()
    let noteId = event.target.noteId.value
    console.log(noteId)
    fetch(`/api/notes/${noteId}`).then( (response) => {
        return response.json()
    }).then( (data) => {
        document.getElementById('results').innerHTML += data.noteTitle + '<br />'
        console.log(('data', data))
    })

}



function getPost(event) {


    event.preventDefault()

    let noteTitle = event.target.noteTitle.value
    let noteDescription = event.target.noteDescription.value
    let note = {
        noteTitle: noteTitle,
        noteDescription: noteDescription
    }

    console.log(note)
    const options = {
        method: 'POST',
        body: JSON.stringify(note),
        headers: new Headers(
            {
                'Content-Type': 'application/json'
            }
        )
    }

    fetch('/api/notes', options)
       .then( (res) =>  res.json())
       .then( (res) => { 
           console.log(res)
       })
       .catch( (err) => {
            console.error({'error': err})
       })
}

function deletePost(event) {

    event.preventDefault()
  

    let noteId = event.target.noteId.value
 
    const options = {
        method: 'DELETE'
    }

    fetch(`/api/notes/${noteId}`, options)
       .then( (res) =>  res.json())
       .then( (res) => console.log(res))
       .catch( (err) => console.error({'error': err}))
}

function updatePost(event) {

    event.preventDefault()
  
    let noteId = event.target.noteId.value
    let noteTitle = event.target.noteTitle.value
    let noteDescription = event.target.noteDescription.value
    let note = {
        noteTitle: noteTitle,
        noteDescription: noteDescription
    }
    const options = {
        method: 'PATCH',
        body: JSON.stringify(note),
        headers: new Headers(
            {
                'Content-Type': 'application/json'
            }
        )
    }

    fetch(`/api/notes/${noteId}`, options)
       .then( (res) =>  res.json())
       .then( (res) => console.log(res))
       .catch( (err) => console.error({'error': err}))
}
