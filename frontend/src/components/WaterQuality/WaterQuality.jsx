import './WaterQuality.css'

function WaterQuality() {
  return (
    <section className="water-quality">
      <div className="water-header">
        <div>
          <h2>Water Quality Monitoring</h2>
          <p>Latest water quality status across monitored villages</p>
        </div>

        <span className="water-status">
          Monitoring Active
        </span>
      </div>

      <div className="water-grid">
        <div className="water-card">
          <div className="water-card-top">
            <span className="water-icon">💧</span>
            <span className="quality-good">Good</span>
          </div>

          <h3>Shivpur</h3>
          <p>Water quality is within safe limits</p>

          <div className="water-value">
            <span>Quality Score</span>
            <strong>92%</strong>
          </div>
        </div>

        <div className="water-card">
          <div className="water-card-top">
            <span className="water-icon">💧</span>
            <span className="quality-medium">Average</span>
          </div>

          <h3>Lakshmipur</h3>
          <p>Water quality requires monitoring</p>

          <div className="water-value">
            <span>Quality Score</span>
            <strong>68%</strong>
          </div>
        </div>

        <div className="water-card">
          <div className="water-card-top">
            <span className="water-icon">💧</span>
            <span className="quality-poor">Poor</span>
          </div>

          <h3>Rampur</h3>
          <p>Possible contamination detected</p>

          <div className="water-value">
            <span>Quality Score</span>
            <strong>38%</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WaterQuality