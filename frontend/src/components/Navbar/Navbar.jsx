import './Navbar.css'
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">♥</span>
        <span>ArogyaAlert</span>
      </div>

      <div className="navbar-right">
        <span className="user-name">Admin</span>
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  )
}

export default Navbar