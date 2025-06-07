import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PassWordItem from '../PassWordItem'
import './index.css'

class PassWord extends Component {
  state = {
    passwords: [],
    website: '',
    username: '',
    password: '',
    showPassword: false,
    count: 0,
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {username, password, website} = this.state

    if (website && username && password) {
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
      }

      this.setState(prevState => ({
        passwords: [...prevState.passwords, newPassword],
        website: '',
        username: '',
        password: '',
        count: prevState.count + 1,
      }))
    }
  }

  onDeletePassword = id => {
    this.setState(prevState => {
      const updatedList = prevState.passwords.filter(item => item.id !== id)
      return {
        passwords: updatedList,
        count: prevState.count - 1,
      }
    })
  }

  onToggleShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  render() {
    const {
      passwords,
      password,
      username,
      website,
      showPassword,
      count,
      searchInput,
    } = this.state

    const filteredPasswords = passwords.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="password-app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="password-manager">
          <form onSubmit={this.onAddPassword} className="form-container">
            <h2 className="add-password">Add New Password</h2>
            <div className="input-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-icon"
              />
              <input
                type="text"
                value={website}
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                className="input-text"
              />
            </div>
            <div className="input-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-icon"
              />
              <input
                type="text"
                value={username}
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                className="input-text"
              />
            </div>
            <div className="input-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-icon"
              />
              <input
                type="password"
                value={password}
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                className="input-text"
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-logo"
          />
        </div>
        <div className="password-cont">
          <div className="password-header">
            <div className="count-cont">
              <h2 className="add-password">Your Passwords </h2>
              <p className="count">{count}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-icon"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.onSearchInput}
                className="input-text"
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="check-cont">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={this.onToggleShowPassword}
              className="input-check"
            />
            <label htmlFor="showPassword" className="check-label">
              Show Passwords
            </label>
          </div>

          <ul className="password-list">
            {filteredPasswords.length === 0 ? (
              <div className="no-password-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password"
                />
                <p className="add-password">No Passwords</p>
              </div>
            ) : (
              filteredPasswords.map(each => (
                <PassWordItem
                  key={each.id}
                  passwordItem={each}
                  showPassword={showPassword}
                  onDeletePassword={this.onDeletePassword}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default PassWord
