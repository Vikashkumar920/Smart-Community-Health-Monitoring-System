import { useEffect, useState } from 'react'
import axios from 'axios'
import './HealthReports.css'

function HealthReports() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchRecords()
  }, [])

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/health-records/user/2'
      )

      setRecords(response.data)
    } catch (error) {
      console.error('Failed to fetch health records:', error)
    }
  }

  const handleNewReport = () => {
    const form = document.getElementById('report-form')

    if (form) {
      form.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  const getStatus = record => {
    if (
      record.oxygen_level < 95 ||
      record.heart_rate > 120 ||
      record.temperature > 38
    ) {
      return 'Critical'
    }

    return 'Normal'
  }

  return (
    <section className="health-reports">
      <div className="reports-title">
        <div>
          <h2>Health Reports</h2>
          <p>Live health records from database</p>
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
          <span>Heart Rate</span>
          <span>Blood Pressure</span>
          <span>Temperature</span>
          <span>Oxygen</span>
          <span>Status</span>
        </div>

        {records.map(record => (
          <div
            className="report-row"
            key={record.id}
          >
            <span>{record.heart_rate}</span>
            <span>{record.blood_pressure}</span>
            <span>{record.temperature}°C</span>
            <span>{record.oxygen_level}%</span>

            <span
              className={
                getStatus(record) === 'Critical'
                  ? 'report-high'
                  : 'report-low'
              }
            >
              {getStatus(record)}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HealthReports