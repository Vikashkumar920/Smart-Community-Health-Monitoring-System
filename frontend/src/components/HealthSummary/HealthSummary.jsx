import './HealthSummary.css'

function HealthSummary() {
  return (
    <section className="health-summary">
      <div className="summary-header">
        <div>
          <h2>Community Health Summary</h2>
          <p>Overview of recent health reports</p>
        </div>

        <span className="summary-status">Monitoring Active</span>
      </div>

      <div className="summary-content">
        <div className="summary-item">
          <span className="summary-label">Normal Reports</span>
          <strong>92</strong>
        </div>

        <div className="summary-item">
          <span className="summary-label">Warning Reports</span>
          <strong>18</strong>
        </div>

        <div className="summary-item">
          <span className="summary-label">Critical Reports</span>
          <strong>10</strong>
        </div>
      </div>
    </section>
  )
}

export default HealthSummary