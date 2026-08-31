import './RecentReports.css'

function RecentReports({ reports }) {
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

        {reports.map((report, index) => (
          <div className="table-row" key={index}>
            <span>{report.village}</span>
            <span>{report.symptoms}</span>
            <span className={`risk-${report.risk.toLowerCase()}`}>
              {report.risk.toUpperCase()}
            </span>
            <span>{report.date}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentReports