export function NotePreview({ note }) {
    console.log(note);
    return (
        <article className="note-preview">
            <h2>Note Info: {note}</h2>
            {/* <h4>Note Price: {note.listPrice.amount}</h4> */}
        </article>
    )
}