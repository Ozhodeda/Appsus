// import { NoteEdit } from "../views/NoteEdit.jsx"

export function NoteTxt({ note, onContentEdit }) {
    // console.log('NoteTxt')
    const { txt, title, id } = note.info
    // console.log('txt', txt)

    return (
        <div>
            <h4 suppressContentEditableWarning={true} contentEditable="true" onBlur={()=>onContentEdit(event, note.id, 'title')}>{title}</h4>
            <p suppressContentEditableWarning={true} contentEditable="true" className="note-txt" onBlur={()=>onContentEdit(event, note.id, 'txt')} >
                {txt}
            </p>
            {/* <NoteEdit noteId={id}/> */}
        </div>

    )
}