import { useState, useEffect } from 'react'
import axios from 'axios'
import './VillageOverview.css'

function VillageOverview() {
  const [villages, setVillages] = useState([])

  useEffect(() => {
    fetchVillages()
  }, [])

  const fetchVillages = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/village-risks'
      )

      setVillages(response.data)
    } catch (error) {
      console.error(
        'Failed to fetch village data:',
        error
      )
    }
  }

  return (
    <section className="village-overview">
      <div className="village-header">
        <div>
          <h2>Village Health Overview</h2>
          <p>Current health status of monitored villages</p>
        </div>

        <button className="view-villages-btn">
          View Villages
        </button>
      </div>

      <div className="village-list">
        {villages.map((village, index) => (
          <div
            className="village-card"
            key={index}
          >
            <div className="village-info">
              <div className="village-icon">🏘️</div>

              <div>
                <h3>{village.village_name}</h3>
                <p>
                  Contamination Level:{' '}
                  {village.contamination_level}%
                </p>
              </div>
            </div>

            <span
              className={`village-status ${
                village.risk_status === 'high'
                  ? 'high-status'
                  : village.risk_status === 'medium'
                  ? 'medium-status'
                  : 'low-status'
              }`}
            >
              {village.risk_status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default VillageOverview