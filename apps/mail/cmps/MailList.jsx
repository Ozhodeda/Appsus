// import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"
import { MailFilter } from "./MailFilter.jsx"

const { useEffect } = React
export function MailList({ mails, onRemoveMail,onSetFilter,filterBy,onSetSortBy,sortBy,setSortBy, loadMails }) {
    
    // console.log(mails);

    useEffect(() => {
        loadMails()
    }, [])

    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy])

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
                />
            ))}
        </tbody>
    </table>
    </React.Fragment>
}
