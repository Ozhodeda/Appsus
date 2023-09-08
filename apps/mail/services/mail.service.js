
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
    getDefaultSort
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
            isStarred: true,
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
            isStarred: true,
            isImportant: false,
            isDraft: false,
            isTrash: false,
        }
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