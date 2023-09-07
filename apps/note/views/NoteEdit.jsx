import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

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

    function handleChange({ target }){
        const field = target.type
        let value= target.value
        console.log('888',field)
        
        
        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit,[field]: txt}))
        
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
                <input onChange={handleChange} value={txt} type={type} name="txt" id="txt" />

                {/* <label htmlFor="listPrice">Price: </label>
                <input onChange={handleChange} value={amount} type="number" name="listPrice" id="listPrice" /> */}

            </div>
        </section>
    )
}