// import{utilService} from '../../../services/util.service/js'
export function MailPreview({mail}){
    // const {useState} = React

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

console.log('mail',mail);
    return <tr>
       <td className='mail-checkbox'>
        <input type="checkbox"  />
       </td>
        <td className='mail-stars'>
        <i className="fa-regular fa-star" ></i>
        </td>
        <td>
        <i className="fa-regular fa-bookmark fa-rotate-270"></i>
        </td>
        <td className="mail-from">{mail.from} </td>
        <td className="mail-subject">{mail.subject} </td>
        <td className="mail-body">{mail.body} </td>
        <td className="mail-date">{getTimeFromStamp(mail.sentAt)} </td>
    </tr>
}