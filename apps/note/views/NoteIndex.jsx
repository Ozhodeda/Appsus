import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteEdit } from "./NoteEdit.jsx"
import { NoteFolderList } from "../cmps/NoteFolderList.jsx"
import { NoteHeader } from "../cmps/NoteHeader.jsx"

// import useOutsideClick from "../../../hooks/use-out-side-click.js"

const { useState, useEffect/*, useRef*/ } = React
const { useNavigate } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    // const navigate = useNavigate()
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    // const noteEditRef = useRef()

    // useOutsideClick(noteEditRef, () => {
    //     console.log('out side click')
    //     setIsExpanded(false)
    // })

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

    function onContentEdit({ target }, id, filed) {
        noteService.get(id).then((note) => {
            console.log('adsdasdasd', filed);
            note.info[filed] = target.innerText
            noteService.save(note)
            console.log('noe on content ', note)
        })


        // change title to target.innerText
        // save note
        // update notes
        console.dir(target.innerText)
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    // noteService.get(id).then((note) => {
    //     note.info.title = target.innerText
    //     onSaveNote(note)
    //         .then(() => {
    //             navigate('/note')
    //             showSuccessMsg(`Added/Edited successfully! ${NoteToEdit.id}`)
    //         })
    //         .catch(err => {
    //             console.log('err:onContentEdit', err)
    //             showErrorMsg('Problem Adding/Editing ' + NoteToEdit.id)
    //         })

    // })

    // function onAddNote() {
    //     console.log('add note')
    // }

    console.log('render')
    if (!notes) return <div className='loader-container'> <div className="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
    return (
        <React.Fragment>
            <NoteHeader onSetFilter={onSetFilterBy} filterBy={filterBy} />
            <main className="note-index">
                <aside className='note-folder-list-container'>
                    <NoteFolderList notes={notes} />
                </aside>
                <NoteEdit notes={notes} />
                <NoteList notes={notes} onRemoveNote={onRemoveNote} onContentEdit={onContentEdit} />
            </main>
        </React.Fragment>
    )
}
