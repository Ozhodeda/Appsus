export function MailAction({ onRemoveMail, mailId, filterBy, onMarkUnRead }) {
    console.log(mailId)
    return (
        <td>
            <button onClick={() => onRemoveMail(mailId)}>
                <i className="fa-regular fa-trash-can"></i>
            </button>

            <button onClick={() => onMarkUnRead(event,mailId)}>
                <i className="fa-regular fa-envelope"></i>
            </button>
        </td>
    )
}