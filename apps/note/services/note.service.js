// note service
// import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTE_KEY = 'keep_DB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    setFilterBy,
    save,
    getDefaultFilter,
    getEmptyNote
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.info.txt) {
                const regex = new RegExp(filterBy.info.txt, 'i')
                notes = notes.filter(note => regex.test(note.title))
            }
            if (filterBy.isPinned) {
                notes = notes.filter(note => note.isPinned === filterBy.isPinned)
            }
            console.log('notes', notes);
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    // .then(note => {
    //     note = _setNextPrevNoteId(note)
    //     return note
    // })
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.info.txt !== undefined) filterBy.info.txt = filterBy.info.txt
    if (filterBy.isPinned !== undefined) filterBy.isPinned = filterBy.isPinned
    return filterBy
}

function getEmptyNote(id = '', type = '', info = {}) {
    return {
        id,
        type,
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info
    }
}

function getDefaultFilter() {
    return { info: { txt: '' }, isPinned: false }
}


function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length)
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby! Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby!Fullstack Me Baby! '
                }
            },
            {
                id: 'n102',
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
            },
            {
                id: 'n103',
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }
        ]
    storageService.saveToStorage(NOTE_KEY, notes)
}
