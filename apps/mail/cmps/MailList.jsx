// import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
import { MailFilter } from "./MailFilter.jsx"
import { MailAction } from "./MailAction.jsx"

const { useEffect } = React
export function MailList({ mails, onRemoveMail, onSetFilter, filterBy, onSetSortBy, sortBy, loadMails, onMarkUnRead }) {

    // console.log(mails);

    useEffect(() => {
        loadMails()
    }, [])

    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])

    function onMarkUnRead(ev, mailId) {
        { console.log(ev) }
        console.log('knmvk')
        if (!ev || !mailId) return
        mailService.setUnReadMail(mailId).then(loadMails)
            .then(() => { showSuccessMsg('Mail marked as unread') }).catch((error) => {
                console.error('Failed to mark unread:', error)
            })
    }

    return <React.Fragment>
        <MailFilter
            onSetFilter={onSetFilter}
            filterBy={filterBy}
            onSetSortBy={onSetSortBy}
            sortBy={sortBy}
        />
        <table className='mail-list'>
            <tbody>
                {mails.map(mail => (
                    <MailPreview
                        key={mail.id}
                        mail={mail}
                        onRemoveMail={onRemoveMail}
                        filterBy={filterBy}
                        onMarkUnRead={onMarkUnRead}
                    />
                    ))}
                {/* {mails.map(mail => (
                    <MailAction
                        mailId={mail.id}
                        onMarkUnRead={onMarkUnRead} />
                ))} */}
            </tbody>
        </table>

    </React.Fragment>
}
