import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVideo } from "./NoteVideo.jsx"
import { NoteTodo } from "./NoteTodo.jsx"

export function NotePreview({ note, onContentEdit }) {

    function DynamicCmp(props) {
        // console.log(props);
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
    return <DynamicCmp note={note} onContentEdit={onContentEdit} />
}