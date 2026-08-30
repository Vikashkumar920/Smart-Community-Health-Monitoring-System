import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">

        <button className="sidebar-item active">
          <span>⌂</span>
          Dashboard
        </button>

        <button className="sidebar-item">
          <span>♥</span>
          Health Records
        </button>

        <button className="sidebar-item">
          <span>⚠</span>
          Alerts
        </button>

        <button className="sidebar-item">
          <span>⌖</span>
          Villages
        </button>

        <button className="sidebar-item">
          <span>💧</span>
          Water Quality
        </button>

        <button className="sidebar-item">
          <span>✚</span>
          Hospitals
        </button>

      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-item emergency">
          <span>🚨</span>
          Emergency SOS
        </button>
      </div>
    </aside>
  )
}

export default Sidebar