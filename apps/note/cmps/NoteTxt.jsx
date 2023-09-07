import { NoteEdit } from "../views/NoteEdit.jsx"

export function NoteTxt({note}){
    console.log('NoteTxt')
    const {txt, title} = note.info
    console.log('txt', txt)

    return (
        <div>
            <h4  suppressContentEditableWarning={true} contentEditable="true">{title}</h4>
        <p suppressContentEditableWarning={true} contentEditable="true" className="note-txt">
            {txt}
        </p>
        </div>
    )
}