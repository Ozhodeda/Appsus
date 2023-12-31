import { mailService } from "../services/mail.service.js";
import { MailAction } from "./MailAction.jsx";

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailDetails({onRemoveMail,filterBy,onMarkUnRead} ) {
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService
            .get(params.mailId)
            .then(setMail)
            .catch((err) => {
                console.log(err)
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return (<div className='loader-container'> <div className="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>)
    return (
        <section className='mail-details'>
            <table className="email-details-tools">
                <tbody>
                    <tr className=''>
                        <button className="details-back" onClick={onBack}>
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <MailAction
                         mailId={mail.id}
                        onRemoveMail={onRemoveMail}
                        filterBy={filterBy}
                        onMarkUnRead={onMarkUnRead}
                        />
                    </tr>
                    
                </tbody>
            </table>
            <div className="email-details-content">
                <p className="details-subject">Subject: {mail.subject}</p>
                <p className="details-from">From: {mail.from}</p>
                <p className="details-to">To: {mail.to}</p>
                <p className="details-body">{mail.body}</p>
            </div>
        </section>
    )

}