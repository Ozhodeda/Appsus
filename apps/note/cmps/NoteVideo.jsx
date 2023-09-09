
export function NoteVideo({note}){
    // console.log('NoteVideo')
    const {title, url} = note.info

    return (
        <div>

            <h4 suppressContentEditableWarning={true} contentEditable="true" onBlur={()=>onContentEdit(event, note.id, 'title')}>{title}</h4>
            <iframe width="210" height="150" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
        </div>

    )
}