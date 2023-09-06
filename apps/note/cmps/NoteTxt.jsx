export function NoteTxt({note}){
    console.log('NoteTxt')
    const {txt} = note.info
    console.log('txt', txt)

    return (
        <p className="note-txt">
            {txt}
        </p>
    )
}