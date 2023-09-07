export function MailAction({onRemoveMail, mailId}) {
    console.log(mailId)
    return (
        <td>
            <button onClick={() => onRemoveMail(mailId)}>
                <i className="fa-regular fa-trash-can"></i>
            </button>
        </td>
    )
}