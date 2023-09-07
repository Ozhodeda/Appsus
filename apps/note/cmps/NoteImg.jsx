// const ()
export function NoteImg({note}){
    console.log('NoteImg')
    const {title, url} = note.info
    console.log('title', title)

    return (
        <div>

            <h4 suppressContentEditableWarning={true} contentEditable="true">{title}</h4>
           <img src="{url}" alt="img" /> 
        </div>

    )
}