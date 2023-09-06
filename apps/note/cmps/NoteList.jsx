import { NotePreview } from "./NotePreview.jsx"
// const { Link } = ReactRouterDOM


export function NoteList({ notes, onRemoveNote }) {
    return (
        <main className="main-notes">
            {notes.map(note =>
                <section className="notes" key={note.id}>
                    <NotePreview note={note} />
                    <button onClick={() => onRemoveNote(note.id)}>delete</button>
                    <button onClick={() => onChangeBcg(note.id)}>bcg</button>
                    <button onClick={() => onPinToTop(note.id)}>Pin</button>
                </section>
            )}
        </main>
    )
}
