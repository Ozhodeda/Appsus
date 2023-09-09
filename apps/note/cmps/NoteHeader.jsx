const { useState, useEffect } = React

export function NoteHeader({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value

        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }
    const { searchFilter } = filterByToEdit
    return (
        <header className='note-header'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100">
                <path d="M24.5,95c-3.584,0-6.5-2.916-6.5-6.5v-73c0-3.584,2.916-6.5,6.5-6.5h37c1.78,0,2.278,1.707,3.5,3l19.219,18.03 C85.366,31.239,86,32.828,86,34.5v54c0,3.584-2.916,6.5-6.5,6.5H24.5z" opacity=".35"></path><path fill="#f2f2f2" d="M22.5,93c-3.584,0-6.5-2.916-6.5-6.5v-73C16,9.916,18.916,7,22.5,7h37 c1.78,0,3.502,0.742,4.724,2.035L82.219,28.03C83.366,29.239,84,30.828,84,32.5v54c0,3.584-2.916,6.5-6.5,6.5H22.5z"></path><path fill="#f9b84f" d="M22,83V17c0-2.209,1.791-4,4-4h30.286c1.095,0,2.142,0.449,2.897,1.241l17.714,18.6 C77.605,33.585,78,34.573,78,35.6V83c0,2.209-1.791,4-4,4H26C23.791,87,22,85.209,22,83z"></path><path fill="#ef8630" d="M59,15v16c0,1.105,0.895,2,2,2h16l-1-2.653l-15-15.5L59,15z"></path><path fill="#40396e" d="M73.5,88h-47c-3.033,0-5.5-2.467-5.5-5.5v-65c0-3.033,2.467-5.5,5.5-5.5h33 c0.412,0,0.806,0.169,1.089,0.468l18,19C78.853,31.747,79,32.116,79,32.5v50C79,85.533,76.533,88,73.5,88z M26.5,15 c-1.378,0-2.5,1.122-2.5,2.5v65c0,1.378,1.122,2.5,2.5,2.5h47c1.378,0,2.5-1.122,2.5-2.5V33.098L58.855,15H26.5z"></path><path fill="#fff" d="M55.5,64.763h-12c-0.552,0-1,0.448-1,1V68.5c0,0.552,0.448,1,1,1h12c0.552,0,1-0.448,1-1v-2.737 C56.5,65.21,56.052,64.763,55.5,64.763z"></path><path fill="#fff" d="M61,51.5c0,3.8-1.85,7.17-4.69,9.26H42.69C39.85,58.67,38,55.3,38,51.5C38,45.15,43.15,40,49.5,40 S61,45.15,61,51.5z"></path>
            </svg>
            <span className='header-span'>Keep</span>
            <input type="text" value={searchFilter} name='searchFilter' placeholder='Search notes' onChange={handleChange} className='search' />
        </header>
    )
}