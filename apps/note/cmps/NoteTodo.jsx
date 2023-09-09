export function NoteTodo({ note, onContentEdit }) {
    // console.log('NoteTodo')
    const { title, todos } = note.info
    // console.log('title', title)
    let key = 101
    return (
        <ul>
            <h4 suppressContentEditableWarning={true} contentEditable="true" onBlur={()=>onContentEdit(event, note.id ,'title')} >{title}</h4>
            {todos.map(todo =>
                <li suppressContentEditableWarning={true} contentEditable="true"onBlur={()=>onContentEdit(event, note.id)} key={note.id + key++}>
                    {todo.txt} <input className="checkbox" type="checkbox" />
                </li>)}

        </ul>
    )
}