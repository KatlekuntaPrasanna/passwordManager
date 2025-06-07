import './index.css'

const colorClassNames = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5',
  'color6',
  'color7',
  'color8',
  'color9',
]

const PassWordItem = props => {
  const {passwordItem, showPassword, onDeletePassword} = props
  const {id, website, username, password} = passwordItem

  const onDelete = () => {
    onDeletePassword(id)
  }

  const randomColorClass =
    colorClassNames[Math.floor(Math.random() * colorClassNames.length)]

  return (
    <li className="list-item">
      <div className={`initial-cont ${randomColorClass}`}>
        <p className="initial">{username[0].toUpperCase()}</p>
      </div>
      <div className="name-cont">
        <p className="name">{website}</p>
        <p className="name">{username}</p>
        {showPassword ? (
          <p className="name">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button type="button" onClick={onDelete} data-testid="delete" className="delete-btn">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PassWordItem
