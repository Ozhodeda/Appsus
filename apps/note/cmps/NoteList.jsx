import { NotePreview } from "./NotePreview.jsx"
import { NoteEdit } from "../views/NoteEdit.jsx"
import ColorSelectionModal from "./ColorModal.jsx"

const { useState } = React

export function NoteList({ notes, onRemoveNote, onContentEdit }) {
    const [selectedColor, setSelectedColor] = useState('rgb(255, 255, 255)')

    const handleColorChange = (color) => {
        console.log(color)
        setSelectedColor(color)
    }

    function getBgc(note) {
        return note.style ? note.style.backgroundColor : 'transparent'
    }


    return (
        <main className="main-notes">
            {notes.map(note =>
                <section style={{ backgroundColor: getBgc(note) }} className="notes" key={note.id}>
                    <NotePreview note={note} onContentEdit={onContentEdit} />
                    <ColorSelectionModal onSelectColor={handleColorChange} color={selectedColor} />
                    <button onClick={() => onRemoveNote(note.id)}>delete</button>

                    {/* <button onClick={openColorModal}>bcg</button> */}
                    <button onClick={() => onPinToTop(note.id)}>Pin</button>
                    <button onClick={NoteEdit.CloseClicked}>Close</button>
                </section>
            )}
        </main>
    )
}
