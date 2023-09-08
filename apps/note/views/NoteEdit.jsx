import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import useOutsideClick from "../../../hooks/use-out-side-click.js"

const { useState, useEffect, useRef } = React
const { useNavigate, useParams } = ReactRouterDOM


export function NoteEdit() {

    const [NoteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [isExpanded, setIsExpanded] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const noteEditRef = useRef()

    useOutsideClick(noteEditRef, () => {
        onSaveNote()
        setIsExpanded(false)
        
    })


    useEffect(() => {
        // console.log('*/*/*/*/*/*/*/*/',params.noteId)
        if (params.noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(params.noteId)
            .then(setNoteToEdit)
            .catch(err => console.log('err: loadNote', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        // console.log('888', value)

        const info = { ...NoteToEdit.info}
        // console.log('a*************************',NoteToEdit)
        info[field] = value
        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, info: info}))

    }

    function onSaveNote(ev) {
        if (ev) ev.preventDefault()
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

    function onCloseClicked(ev){
        onSaveNote(ev)
        setIsExpanded(false)

    }


    const { txt, title } = NoteToEdit.info
    return (
        <section className="note-edit">
            <div>
                <div className="add-note"  ref={noteEditRef }>
                    <h4 hidden={!isExpanded} className="note-title" 
                    ><input onChange={handleChange} placeholder="Title" type="text" value ={title} name="title" /></h4>
                    <div onClick={() => {
                        setIsExpanded(true)
                    }} ><input onChange={handleChange} placeholder="Take a note..." 
                    value={txt} type="text" name="txt" id="info"/>
                    </div>
                    <footer hidden={!isExpanded} className="note-footer" >
                        <button>Todo</button> <button>noteImg</button> <button onClick={onCloseClicked}>Close</button>
                    </footer>
                </div>

                {/* <label htmlFor="listPrice">Price: </label>
                <input onChange={handleChange} value={amount} type="number" name="listPrice" id="listPrice" /> */}

            </div>
        </section>
    )
}