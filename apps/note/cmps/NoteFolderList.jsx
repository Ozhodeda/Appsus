export function NoteFolderList() {
    return (
        <React.Fragment>
            <div className="note-categories">
                <button className="note-note" name="notedNotes">
                    <i className="fa-regular fa-lightbulb"></i>
                </button>

                <button className="note-reminder" name="reminderNotes">
                    <i className="fa-regular fa-bell"></i>
                </button>

                <button className="note-edit" name="editNotes">     
                    <i className="fa-solid fa-pen fa-lg"></i>
                </button>

                <button className="note-archive" name="archiveNotes">
                    <i className="fa-solid fa-box-archive"></i>
                </button>

                <button className="note-trash" name="trashNotes">
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </React.Fragment>
    )
}