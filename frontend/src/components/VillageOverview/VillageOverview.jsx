import './VillageOverview.css'

function VillageOverview() {
  return (
    <section className="village-overview">
      <div className="village-header">
        <div>
          <h2>Village Health Overview</h2>
          <p>Current health status of monitored villages</p>
        </div>

        <button className="view-villages-btn">
          View Villages
        </button>
      </div>

      <div className="village-list">
        <div className="village-card">
          <div className="village-info">
            <div className="village-icon">🏘️</div>

            <div>
              <h3>Rampur</h3>
              <p>25 health reports</p>
            </div>
          </div>

          <span className="village-status high-status">
            High Risk
          </span>
        </div>

        <div className="village-card">
          <div className="village-info">
            <div className="village-icon">🏘️</div>

            <div>
              <h3>Lakshmipur</h3>
              <p>18 health reports</p>
            </div>
          </div>

          <span className="village-status medium-status">
            Medium Risk
          </span>
        </div>

        <div className="village-card">
          <div className="village-info">
            <div className="village-icon">🏘️</div>

            <div>
              <h3>Shivpur</h3>
              <p>32 health reports</p>
            </div>
          </div>

          <span className="village-status low-status">
            Low Risk
          </span>
        </div>

        <div className="village-card">
          <div className="village-info">
            <div className="village-icon">🏘️</div>

            <div>
              <h3>Rampur Kalan</h3>
              <p>21 health reports</p>
            </div>
          </div>

          <span className="village-status low-status">
            Low Risk
          </span>
        </div>
      </div>
    </section>
  )
}

export default VillageOverview