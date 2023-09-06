import { NotePreview } from "./NotePreview.jsx"
// const { Link } = ReactRouterDOM


export function NoteList({ notes, onRemoveNote }) {
    return (
        <main className="main-notes">
            <div>note list</div>
            {notes.map(note =>
                <article key={note.id}>
                    <NotePreview note={note}/>
                    <section>

                        <button onClick={() => onRemoveNote(note.id)}>delete</button>
                    </section>


                </article>
            )}
        </main>
    )
}
