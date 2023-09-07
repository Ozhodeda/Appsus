export function NoteTodo({ note }) {
    console.log('NoteTodo')
    const { title, todos } = note.info
    console.log('title', title)
    let key = 101
    return (
        <ul>
            <h4 suppressContentEditableWarning={true} contentEditable="true">{title}</h4>
            {todos.map(todo =>
                <li key={note.id + key++}>
                    {todo.txt} <input className="checkbox" type="checkbox" />
                </li>)}

        </ul>
    )
}