import { useEffect, useState } from 'react'
import axios from 'axios'
import './RiskOverview.css'

function RiskOverview() {
  const [riskData, setRiskData] = useState({
    highRiskVillages: 0,
    mediumRiskVillages: 0,
    lowRiskVillages: 0
  })

  useEffect(() => {
    fetchRiskSummary()
  }, [])

  const fetchRiskSummary = async () => {
    try {
     const response = await axios.get(
  'http://localhost:5000/api/village-risks/summary'
)

      setRiskData(response.data)
    } catch (error) {
      console.error(
        'Failed to fetch risk summary:',
        error
      )
    }
  }

  return (
    <section className="risk-overview">
      <div className="risk-header">
        <div>
          <h2>Risk Overview</h2>
          <p>
            Current health risk distribution across communities
          </p>
        </div>
      </div>

      <div className="risk-content">
        <div className="risk-stat">
          <div className="risk-circle high">
            <span>{riskData.highRiskVillages}</span>
          </div>

          <div>
            <h3>High Risk</h3>
            <p>
              Communities requiring immediate attention
            </p>
          </div>
        </div>

        <div className="risk-stat">
          <div className="risk-circle medium">
            <span>{riskData.mediumRiskVillages}</span>
          </div>

          <div>
            <h3>Medium Risk</h3>
            <p>
              Communities requiring monitoring
            </p>
          </div>
        </div>

        <div className="risk-stat">
          <div className="risk-circle low">
            <span>{riskData.lowRiskVillages}</span>
          </div>

          <div>
            <h3>Low Risk</h3>
            <p>
              Communities currently stable
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RiskOverview