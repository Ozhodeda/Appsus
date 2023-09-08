const { useEffect, useRef, useState } = React
const { useNavigate, useLocation } = ReactRouterDOM

export function MailFolderList({mails,
    onSetFilter,
    filterBy,}) {
    return (
        <React.Fragment>
                <button className='compose-mail'>
                    <i className="fa-solid fa-pen fa-lg"></i>
                </button>
            <div className="mail-categories">

                <button className="mail-inbox unselect" name="inbox">
                    <i className="fa-solid fa-inbox"></i>
                </button>

                <button className="mail-star unselect" name="starredMails">
                    <i className="fa-regular fa-star" ></i>
                </button>

                <button className="mail-important unselect" name="importantMails">
                    <i className="fa-regular fa-bookmark fa-rotate-90"></i>
                </button>

                <button className="mail-sent unselect" name="sentMails">
                    <i className="fa-solid fa-paper-plane"></i>
                </button>

                <button className="mail-draft unselect" name="draftMails">
                    <i className="fa-regular fa-note-sticky fa-rotate-180"></i>
                </button>

                <button className="mail-trash unselect" name="trashMails">
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </React.Fragment>
    )
}