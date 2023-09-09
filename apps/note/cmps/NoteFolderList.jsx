export function NoteFolderList() {
    return (
        <React.Fragment>
            <button className='compose-note'>
                <i className="fa-solid fa-pen fa-lg"></i>
            </button>
            <div className="note-categories">

                <button className="note-inbox" name="inbox">
                    <i className="fa-solid fa-inbox"></i>
                </button>

                <button className="note-star" name="starredNotes">
                    <i className="fa-regular fa-star" ></i>
                </button>

                <button className="note-important" name="importantNotes">
                    <i className="fa-regular fa-bookmark fa-rotate-90"></i>
                </button>

                <button className="note-edit" name="editNotes">
                    <i className="fa-solid fa-pen fa-lg"></i>                </button>

                <button className="note-draft" name="draftNotes">
                <img src="https://icons.iconarchive.com/icons/ionic/ionicons/16/archive-outline-icon.png" width="16" height="16"/>
                </button>

                <button className="note-trash" name="trashNotes">
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </React.Fragment>
    )
}