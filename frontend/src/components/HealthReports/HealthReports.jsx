import './HealthReports.css'

function HealthReports() {
  const handleNewReport = () => {
    const form = document.getElementById('report-form')

    if (form) {
      form.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="health-reports">
      <div className="reports-title">
        <div>
          <h2>Health Reports</h2>
          <p>Recent health reports submitted by communities</p>
        </div>

        <button
          className="report-btn"
          onClick={handleNewReport}
        >
          + New Report
        </button>
      </div>

      <div className="reports-table">
        <div className="report-row report-heading">
          <span>Village</span>
          <span>Symptoms</span>
          <span>Reports</span>
          <span>Status</span>
        </div>

        <div className="report-row">
          <span>Rampur</span>
          <span>Fever, Diarrhea</span>
          <span>25</span>
          <span className="report-high">High Risk</span>
        </div>

        <div className="report-row">
          <span>Lakshmipur</span>
          <span>Fever, Vomiting</span>
          <span>18</span>
          <span className="report-medium">Medium Risk</span>
        </div>

        <div className="report-row">
          <span>Shivpur</span>
          <span>None Reported</span>
          <span>32</span>
          <span className="report-low">Low Risk</span>
        </div>

        <div className="report-row">
          <span>Rampur Kalan</span>
          <span>Headache, Fever</span>
          <span>21</span>
          <span className="report-low">Low Risk</span>
        </div>
      </div>
    </section>
  )
}

export default HealthReports