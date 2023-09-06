import { mailService } from '../../mail/services/mail.service.js';
import { MailList } from '../cmps/MailList.jsx';
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
// const { Link } = ReactRouterDOM


export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

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


    // function onSetFilterBy(filterBy) {
    //     // console.log('filterBy:', filterBy)
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    // }
    
    if (!mails) return <div className='loader-container'> <div className="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
    return (
        <div className='mail-app-container'>
            <main className='mail-app'>
                <div className='mail-list-container'>
                    <MailList mails={mails} onRemoveMail={onRemoveMail} />
                </div>
            </main>
        </div>
    )
}

