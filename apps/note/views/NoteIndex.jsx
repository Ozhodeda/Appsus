import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteEdit } from "./NoteEdit.jsx"

import useOutsideClick from "../../../hooks/use-out-side-click.js"

const { useState, useEffect, useRef } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const noteEditRef = useRef()

    useOutsideClick(noteEditRef, () => {
        console.log('out side click')
        setIsExpanded(false)
    })

    useEffect(() => {
        console.log('mount')
        noteService.query(filterBy).then(setNotes)
    }, [filterBy])

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            showSuccessMsg(`note Removed! ${noteId}`)
        })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Removing ' + noteId)
            })
    }

    // function onSetFilterBy(filterBy) {
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    // }

    // function onAddNote() {
    //     console.log('add note')
    // }

    console.log('render')
    if (!notes) return <div>Loading...</div>
    return (
        <main className="note-index">
            <div className="add-note" ref={noteEditRef}>
                <h4 hidden={!isExpanded} className="note-title" ><input placeholder="Title" type="text" /></h4>
                <div onClick={() => {
                    setIsExpanded(true)
                }} ><input placeholder="Take a note..." type="text" /></div>
                <footer hidden={!isExpanded} className="note-footer" >
                    <button>Todo</button> <button>noteImg</button> <button>Close</button>
                </footer>
            </div>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </main>
    )
}
