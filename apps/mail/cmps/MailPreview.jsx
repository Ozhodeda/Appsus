// import { utilService } from '../../../services/util.service/js'
import { MailAction } from './MailAction.jsx'

// const { useState } = React
const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail,onMarkUnread }) {

    const navigate = useNavigate()
    // const [isHovered, setIsHovered] = useState(false)
    // const handleMouseEnter = () => setIsHovered(true)
    // const handleMouseLeave = () => setIsHovered(false)
    function getTimeFromStamp(timestamp) {
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        const date = new Date(timestamp)
        const time =
            timeFormat(date.getHours()) + ':' + timeFormat(date.getMinutes())
        const currTimestamp = Date.now()
        const currDate = new Date(currTimestamp)
        const day = 1000 * 60 * 60 * 24
        if (currTimestamp - timestamp < day) return 'Today ' + time
        if (currTimestamp - timestamp < day * 2) return 'Yesterday ' + time
        if (currTimestamp - timestamp < day * 7) return days[date.getDay()]
        if (currDate.getUTCFullYear() !== date.getUTCFullYear())
            return months[date.getMonth()].slice(0, 3) + ' ' + date.getUTCFullYear()
        return date.getDate() + ' ' + months[date.getMonth()].slice(0, 3)
    }

    function timeFormat(time) {
        return time < 10 ? '0' + time : time
    }

    console.log('mail', mail);
    return (
        <tr>
            <td className='mail-checkbox'>
                <input type="checkbox" />
            </td>
            <td className="mail-star">
                <button onClick={(event) => onStarMail(event, mail.id)}>
                    {mail.isStarred ? (
                        <i
                            className="fa-solid fa-star"
                            style={{ color: '#fbbc04' }}
                        ></i>
                    ) : (
                        <i
                            className="fa-regular fa-star"
                            style={{ color: '#6b6b6b' }}
                        ></i>
                    )}
                </button>
            </td>
            <td className="mail-important">
                <button onClick={(event) => onImportantMail(event, mail.id)}>
                    {mail.isImportant ? (
                        <i
                            className="fa-regular fa-bookmark fa-rotate-90"
                            style={{ color: '#fbbc04' }}
                        ></i>
                    ) : (
                        <i
                            className="fa-regular fa-bookmark fa-rotate-90"
                            style={{ color: '#6b6b6b' }}
                        ></i>
                    )}
                </button>
            </td>
            <div onClick={() => navigate(`/mail/${mail.id}`)}>
                <td className="mail-from">{mail.from} </td>
                <td className="mail-subject">{mail.subject} </td>
                <td className="mail-body">{mail.body} </td>
            </div>
            <MailAction
                mailId={mail.id}
                onRemoveMail={onRemoveMail}
                onMarkUnread={onMarkUnread}
            />
            <td className="mail-date">{getTimeFromStamp(mail.sentAt)} </td>
        </tr>
    )
}