export function MailFolderList() {
    return (
        <React.Fragment>
            <button className='compose-mail'>
                <i className="fa-solid fa-pen fa-lg"></i>
            </button>

            <button className="mail-inbox" name="inbox">
                <i className="fa-solid fa-inbox"></i>
            </button>

            <button className="mail-star" name="starredMails">
                <i className="fa-regular fa-star" ></i>
            </button>

            <button className="mail-important" name="importantMails">
                <i className="fa-regular fa-bookmark fa-rotate-90"></i>
            </button>

            <button className="mail-sent" name="sentMails">
                <i className="fa-solid fa-paper-plane"></i>
            </button>

            <button className="mail-draft" name="draftMails">
                <i className="fa-regular fa-note-sticky fa-rotate-180"></i>
            </button>

            <button className="mail-trash" name="trashMails">
                <i className="fa-regular fa-trash-can"></i>
            </button>
        </React.Fragment>
    )
}