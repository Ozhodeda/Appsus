
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
    getDefaultFilter,
    getDefaultSort,
    setReadMail,
    setUnReadMail
}

function query(filterBy = {}, sortBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.searchFilter) {
                const regExp = new RegExp(filterBy.searchFilter, 'i')
                mails = mails.filter(
                    (mail) =>
                        regExp.test(mail.subject) ||
                        regExp.test(mail.body) ||
                        regExp.test(mail.from)
                )
            }
            if (filterBy.readFilter === 'Read') {
                mails = mails.filter((mail) => mail.isRead)
            }
            if (filterBy.readFilter === 'Unread') {
                mails = mails.filter((mail) => !mail.isRead)
            }
            if (filterBy.inbox === true) {
                mails = mails.filter(
                    (mail) =>
                        mail.from !== loggedinUser.email &&
                        !mail.isTrash &&
                        !mail.isDraft
                )
            }
            if (filterBy.starredMails === true) {
                mails = mails.filter(
                    (mail) => mail.isStarred &&
                        !mail.isTrash &&
                        !mail.isDraft
                )
            }
            if (filterBy.importantMails === true) {
                mails = mails.filter(
                    (mail) => mail.isImportant &&
                        !mail.isTrash &&
                        !mail.isDraft
                )
            }
            if (filterBy.sentMails === true) {
                mails = mails.filter(
                    (mail) =>
                        mail.from === loggedinUser.email &&
                        !mail.isTrash &&
                        !mail.isDraft
                )
            }
            if (filterBy.trashMails === true) {
                mails = mails.filter((mail) => mail.isTrash && !mail.isDraft)
            }
            if (filterBy.draftMails === true) {
                mails = mails.filter((mail) => mail.isDraft && !mail.isTrash)
            }
            if (sortBy.sortByDate) mails = _sortMails(mails, 'sortByDate')
            else if (sortBy.sortByTitle) mails = _sortMails(mails, 'sortByTitle')
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

function setReadMail(mailId) {
    return storageService.get(MAIL_KEY, mailId).then((mail) => {
        mail.isRead = true
        return storageService.put(MAIL_KEY, mail)
    })
}

function setUnReadMail(mailId) {
    return storageService.get(MAIL_KEY, mailId).then((mail) => {
        mail.isRead = false
        return storageService.put(MAIL_KEY, mail)
    })
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

function getDefaultFilter() {
    return {}
}

function getDefaultSort() {
    return { sortByDate: true, sortByTitle: false}
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
            to: 'user@appsus.com',
            isStarred: true,
            isImportant: false,
            isDraft: false,
            isTrash: false,
        },
        {
            id: 'e102',
            subject: 'Sprint 3 - Appsus!',
            body: 'lets learn and practice React framework ',
            isRead: false,
            sentAt: 1551133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com',
            isStarred: false,
            isImportant: false,
            isDraft: false,
            isTrash: false,
        },
        {
            id: 'e103',
            subject: 'Your receipt from Apple',
            body: 'Receipt for Apple ID is ready and wait for you in the mail ',
            isRead: false,
            sentAt: new Date(),
            removedAt: null,
            from: 'Apple',
            to: 'user@appsus.com',
            isStarred: false,
            isImportant: false,
            isDraft: false,
            isTrash: false,
        },
        {
            id: 'e104',
            subject: 'Thank you for your purchase',
            body: 'You will find a copy of your transaction details below and a link to the terms which apply. Please print this and keep it in a safe place for future reference. ',
            isRead: true,
            sentAt: new Date(),
            removedAt: null,
            from: 'PlayStation',
            to: 'user@appsus.com',
            isStarred: true,
            isImportant: true,
            isDraft: false,
            isTrash: false,
        },
        {
            id: 'e105',
            subject: '8 Advanced JavaScript Interview Questions for Senior Roles ',
            body: 'JavaScript is a powerful language that is one of the primary building blocks of the web. This powerful language also has some of its quirks. For instance, did you know that 0 === -0 evaluates to true, or that Number("") yields 0? ',
            isRead: true,
            sentAt: new Date(),
            removedAt: null,
            from: 'Medium Daily Digest',
            to: 'user@appsus.com',
            isStarred: false,
            isImportant: true,
            isDraft: false,
            isTrash: false,
        },
        {
            id: 'e106',
            subject: 'Your icloud storage is full',
            body: 'Hello Oz Hodeda,Your iCloud storage is full. You have exceeded your storage plan and this means that your documents, contacts and device data are no longer being backed up to iCloud. Your photos and videos are also not being uploaded to iCloud Photos. iCloud Drive and iCloud-enabled apps are not being updated across your devices. ',
            isRead: true,
            sentAt: new Date(),
            removedAt: null,
            from: 'Icloud',
            to: 'user@appsus.com',
            isStarred: true,
            isImportant: false,
            isDraft: false,
            isTrash: false,
        },
        {
            id: 'e107',
            subject: 'Welcome to Tabnine! ',
            body: 'Tabnine has been successfully installedDuring your 14-day preview, you’ll get Tabnine Pro’s advanced completions.Once your preview is over, you can upgrade or go back to Tabnine’s basic completions. ',
            isRead: true,
            sentAt: new Date(),
            removedAt: null,
            from: 'Tabnine',
            to: 'user@appsus.com',
            isStarred: true,
            isImportant: true,
            isDraft: false,
            isTrash: false,
        },
        {
            id: 'e108',
            subject: 'Almog and 47 others made changes in your shared folders',
            body: `Here's what happened in your shared folders last week`,
            isRead: true,
            sentAt: new Date(),
            removedAt: null,
            from: 'Dropbox',
            to: 'user@appsus.com',
            isStarred: false,
            isImportant: true,
            isDraft: false,
            isTrash: false,
        },
        {
            id: 'e109',
            subject: 'We have for you a new music playlist',
            body: `Based on the music you've heard recently, we've found a new and exciting playlist for you`,
            isRead: true,
            sentAt: new Date(),
            removedAt: null,
            from: 'Spotify',
            to: 'user@appsus.com',
            isStarred: false,
            isImportant: false,
            isDraft: false,
            isTrash: false,
        },
        {
            id: 'e110',
            subject: 'ספורט פיטנס 10 - חשבונית',
            body: 'מצורף לדואר אלקטרוני זה קישור למסמך חשבונית מס קבלה מספר 235',
            isRead: true,
            sentAt: new Date(),
            removedAt: null,
            from: 'donotreply',
            to: 'user@appsus.com',
            isStarred: true,
            isImportant: false,
            isDraft: false,
            isTrash: false,
        },
        ]
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function _sortMails(mails, sortBy) {
    if (sortBy === 'sortByDate') {
        const newMail = mails.sort(
            (mailX, mailY) => mailY.sentAt - mailX.sentAt
        )
        return newMail
    } else if (sortBy === 'sortByTitle') {
        return mails.sort((mailX, mailY) =>
            mailX.subject.localeCompare(mailY.subject)
        )
    } 
}