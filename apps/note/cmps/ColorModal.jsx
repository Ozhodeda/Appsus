
const { useState } = React

const ColorSelectionModal = ({ onSelectColor, note }) => {
  const [isVisible, setIsVisible] = useState(false)

  const colors = [
    'rgb(255, 255, 255)',
    'rgb(250, 175, 168)',
    'rgb(243, 159, 118)',
    'rgb(255, 248, 184)',
    'rgb(226, 246, 211)',
    'rgb(180, 221, 211)',
    'rgb(212, 228, 237)',
    'rgb(174, 204, 220)',
    'rgb(211, 191, 219)',
    'rgb(246, 226, 221)',
    'rgb(233, 227, 212)',
    'rgb(239, 239, 241)'
  ]

  const openModal = () => {
    setIsVisible(true)
  }

  const closeModal = () => {
    setIsVisible(false)
  }

  return (
    <div>
      <button onClick={openModal}><i className="fa-solid fa-palette"></i></button>
      {isVisible && (
        <div className="modal">
          {colors.map((color, index) => (
            <button className="btn-color" key={index} onClick={() => onSelectColor(color, note)}  style={{ backgroundColor: color }}>
              <i className="fa-solid fa-o fa-lg"></i>
            </button>
          ))}
          <button onClick={closeModal}><i className="fa-solid fa-xmark"></i></button>
        </div>
      )}
    </div>
  )
}

export default ColorSelectionModal