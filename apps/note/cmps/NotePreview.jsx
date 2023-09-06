import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodo } from "./NoteTodo.jsx"

const { useState } = React


export function NotePreview({ note }) {
    console.log('1' ,note);

    // function handleChange({ target }) {
    //     console.log('2', target);
    //     const field = target.name
    //     let value = target.value
    //     switch (target.type) {
    //         case 'number':
    //         case 'range':
    //             value = +value || ''
    //             break;
    //         case 'checkbox':
    //             value = target.checked
    //             break
    //         case 'select':
    //             value = target.selection
    //             break
    //         default:
    //             break;
    //     }
    //     setReview(prevReview => ({ ...prevReview, [field]: value }))
    // }



    function DynamicCmp(props) {
        console.log(props);
        switch (note.type) {
            case 'NoteTxt':
                return <NoteTxt {...props} />
            case 'NoteImg':
                return <NoteImg {...props} />
            case 'NoteVideo':
                return <NoteVideo {...props} />
            case 'NoteTodos':
                return <NoteTodo {...props} />
        }
    }

    return <DynamicCmp note={note} />
}