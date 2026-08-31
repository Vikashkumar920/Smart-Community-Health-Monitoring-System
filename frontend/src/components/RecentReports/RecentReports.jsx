import './RecentReports.css'

function RecentReports() {
  return (
    <section className="recent-reports">
      <div className="reports-header">
        <div>
          <h2>Recent Health Reports</h2>
          <p>Latest reports submitted by communities</p>
        </div>

        <button className="view-all-btn">
          View All
        </button>
      </div>

      <div className="reports-table">
        <div className="table-row table-heading">
          <span>Village</span>
          <span>Symptoms</span>
          <span>Risk Level</span>
          <span>Date</span>
        </div>

        <div className="table-row">
          <span>Rampur</span>
          <span>Fever, Diarrhea</span>
          <span className="risk-high">HIGH</span>
          <span>Today</span>
        </div>

        <div className="table-row">
          <span>Lakshmipur</span>
          <span>Fever</span>
          <span className="risk-medium">MEDIUM</span>
          <span>Today</span>
        </div>

        <div className="table-row">
          <span>Shivpur</span>
          <span>Normal</span>
          <span className="risk-low">LOW</span>
          <span>Yesterday</span>
        </div>
      </div>
    </section>
  )
}

export default RecentReports