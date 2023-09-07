import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { useEffect } = React
export function MailList({ mails, onRemoveMail }) {
    
    // console.log(mails);



    return <table className='mail-list'>
        <tbody>
            {mails.map(mail => (
                <MailPreview
                    key={mail.id}
                    mail={mail}
                    onRemoveMail={onRemoveMail}
                   
                />
            ))}
        </tbody>
    </table>
}
