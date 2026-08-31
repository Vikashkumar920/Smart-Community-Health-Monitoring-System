import { useEffect, useState } from 'react'
import axios from 'axios'
import './OutbreakAlerts.css'

function OutbreakAlerts() {
  const [outbreaks, setOutbreaks] = useState([])

  useEffect(() => {
    fetchOutbreaks()
  }, [])

  const fetchOutbreaks = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/community-reports'
      )

      const highRiskReports = response.data
        .filter(report => report.affected_people >= 50)
        .map(report => ({
          village: report.village_name,
          totalHighRiskRecords: report.affected_people,
          status: 'OUTBREAK WARNING',
          riskLevel: 'CRITICAL'
        }))

      setOutbreaks(highRiskReports)
    } catch (error) {
      console.error('Failed to fetch outbreaks:', error)
    }
  }

  if (outbreaks.length === 0) {
    return null
  }

  return (
    <section className="outbreak-alerts">
      <h2>🚨 Outbreak Alerts</h2>

      {outbreaks.map((outbreak, index) => (
        <div
          key={index}
          className="outbreak-card"
        >
          <h3>{outbreak.village}</h3>

          <p>
            Affected People:
            <strong>
              {' '}
              {outbreak.totalHighRiskRecords}
            </strong>
          </p>

          <p>{outbreak.status}</p>

          <span className="critical-badge">
            {outbreak.riskLevel}
          </span>
        </div>
      ))}
    </section>
  )
}

export default OutbreakAlerts