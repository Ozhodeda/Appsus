import { mailService } from '../../mail/services/mail.service.js';
import { MailList } from '../cmps/MailList.jsx';
import { MailDetails } from '../cmps/MailDetails.jsx';
import { MailFolderList } from '../cmps/MailFolderList.jsx';
import { MailHeader } from '../cmps/MailHeader.jsx';

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailAction } from '../cmps/MailAction.jsx';

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM
// const { Link } = ReactRouterDOM


export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(mailService.getDefaultSort())
    const params = useParams()

    useEffect(() => {
        console.log('mount')
        mailService.query(filterBy).then(setMails)
            // mailService.query().then(setMails)
            .catch(err => console.log('err:', err))

    }, [filterBy])


    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
            showSuccessMsg(`Mail Removed! ${mailId}`)
        })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Removing ' + mailId)
            })
    }

    function loadMails() {
        mailService
            .query(filterBy, sortBy)
            .then((mails) => {
                setMails(mails)
            })
            .catch((error) => {
                console.error('Failed to load mails:', error)
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
    }
    function onSetSortBy(sortBy) {
        setSortBy((prevSortBy) => ({ ...prevSortBy, ...sortBy }))
    }

    function onMarkUnRead(ev,mailId) {
        {console.log(ev)}
        console.log('knmvk')
        if(!ev||!mailId) return
        mailService.setUnReadMail(mailId).then(loadMails)
        .then(() => {showSuccessMsg('Mail marked as unread')}).catch((error) => {
            console.error('Failed to mark unread:', error)
        })
    }


    if (!mails) return (<div className='loader-container'> <div className="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>)
    return (
    
        <div className='mail-app-container'>
            <MailHeader onSetFilter={onSetFilter} filterBy={filterBy} />
            <main className='mail-app'>
                <aside className='mail-folder-list-container'>
                    <MailFolderList
                        mails={mails}
                        onSetFilter={onSetFilter}
                        filterBy={filterBy} />
                </aside>
                {params && Object.keys(params).length > 0 ? (
                    <MailDetails
                        onRemoveMail={onRemoveMail}
                        filterBy={filterBy}
                        onMarkUnRead={onMarkUnRead} />) : (
                    <div className='mail-list-container'>
                        <MailList
                            mails={mails}
                            onRemoveMail={onRemoveMail}
                            loadMails={loadMails}
                            onSetFilter={onSetFilter}
                            filterBy={filterBy}
                            onSetSortBy={onSetSortBy}
                            sortBy={sortBy}
                            onMarkUnRead={onMarkUnRead} 
                            />
                    </div>)}
            </main>
        </div>

        
        
    )
}


{/* <Routes>
    <Route path="starred" element={<MailList type="starred" />} />
    <Route path="sent" element={<MailList type="sent" />} />
    <Route path="/note" element={<NoteIndex />} />
</Routes> */}