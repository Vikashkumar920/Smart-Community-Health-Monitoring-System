import './RiskOverview.css'

function RiskOverview() {
  return (
    <section className="risk-overview">
      <div className="risk-header">
        <div>
          <h2>Risk Overview</h2>
          <p>Current health risk distribution across communities</p>
        </div>
      </div>

      <div className="risk-content">
        <div className="risk-stat">
          <div className="risk-circle high">
            <span>5</span>
          </div>

          <div>
            <h3>High Risk</h3>
            <p>Communities requiring immediate attention</p>
          </div>
        </div>

        <div className="risk-stat">
          <div className="risk-circle medium">
            <span>8</span>
          </div>

          <div>
            <h3>Medium Risk</h3>
            <p>Communities requiring monitoring</p>
          </div>
        </div>

        <div className="risk-stat">
          <div className="risk-circle low">
            <span>12</span>
          </div>

          <div>
            <h3>Low Risk</h3>
            <p>Communities currently stable</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RiskOverview