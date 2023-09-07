
import { storageService } from '../../../services/async-storage.service.js'
// import { utilService } from '../../../util.service.js'

const MAIL_KEY = 'mailDB'
_createMails()


export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.subject) {
                const regex = new RegExp(filterBy.subject, 'i')
                mails = mails.filter(mail => regex.test(mail.subject))
            }
            if (filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead >= filterBy.isRead)
            }
            return mails
        })

}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getDefaultFilter() {
    return { subject: '', body: '' }
}


function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: '',
        to: ''
    }
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [{
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: true,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'oz360@gmail.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e102',
            subject: 'Sprint 3 - Appsus!',
            body: 'lets learn and practice React framework ',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e103',
            subject: 'Your receipt from Apple',
            body: 'Receipt for Apple ID is ready and wait for you in the mail ',
            isRead: false,
            sentAt: new Date(),
            removedAt: null,
            from: 'Apple',
            to: 'user@appsus.com'
        }
        ]
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
