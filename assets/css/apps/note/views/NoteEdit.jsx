import { noteService } from "../../../../../apps/note/services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM


export function NoteEdit() {

    const [NoteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(params.noteId)
            .then(setNoteToEdit)
            .catch(err => console.log('err:', err))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(NoteToEdit)
            .then(() => {
                navigate('/note')
                showSuccessMsg(`Added/Edited successfully! ${NoteToEdit.id}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Adding/Editing ' + NoteToEdit.id)
            })
    }

    const { type, info: { txt } } = NoteToEdit

    return (
        <section className="note-edit">
            <div onChange={onSaveNote} >
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="listPrice">Price: </label>
                <input onChange={handleChange} value={amount} type="number" name="listPrice" id="listPrice" />

                <button>Save</button>
            </div>
        </section>
    )
}