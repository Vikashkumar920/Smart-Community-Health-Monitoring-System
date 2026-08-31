import { useEffect, useState } from 'react'
import axios from 'axios'
import './HealthSummary.css'

function HealthSummary() {
  const [summary, setSummary] = useState({
    normal: 0,
    warning: 0,
    critical: 0
  })

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/health-records/recent'
      )

      let normal = 0
      let warning = 0
      let critical = 0

      response.data.forEach(record => {
        const oxygen = Number(record.oxygen_level)
        const temperature = Number(record.temperature)
        const heartRate = Number(record.heart_rate)

        if (
          oxygen < 95 ||
          temperature > 38 ||
          heartRate > 120
        ) {
          critical++
        } else if (
          oxygen < 97 ||
          temperature > 37.5 ||
          heartRate > 100
        ) {
          warning++
        } else {
          normal++
        }
      })

      setSummary({
        normal,
        warning,
        critical
      })
    } catch (error) {
      console.error('Summary fetch failed:', error)
    }
  }

  return (
    <section className="health-summary">
      <div className="summary-header">
        <div>
          <h2>Community Health Summary</h2>
          <p>Overview of recent health reports</p>
        </div>

        <span className="summary-status">
          Monitoring Active
        </span>
      </div>

      <div className="summary-content">
        <div className="summary-item">
          <span className="summary-label">
            Normal Reports
          </span>
          <strong>{summary.normal}</strong>
        </div>

        <div className="summary-item">
          <span className="summary-label">
            Warning Reports
          </span>
          <strong>{summary.warning}</strong>
        </div>

        <div className="summary-item">
          <span className="summary-label">
            Critical Reports
          </span>
          <strong>{summary.critical}</strong>
        </div>
      </div>
    </section>
  )
}

export default HealthSummary