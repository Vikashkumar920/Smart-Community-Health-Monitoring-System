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
        'http://localhost:5000/api/community-reports'
      )

      setVillages(response.data)
    } catch (error) {
      console.error(
        'Failed to fetch village data:',
        error
      )
    }
  }

  const getRiskStatus = affectedPeople => {
    if (affectedPeople >= 50) {
      return 'high'
    }

    if (affectedPeople >= 20) {
      return 'medium'
    }

    return 'low'
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
        {villages.map((village, index) => {
          const riskStatus = getRiskStatus(
            village.affected_people
          )

          return (
            <div
              className="village-card"
              key={index}
            >
              <div className="village-info">
                <div className="village-icon">🏘️</div>

                <div>
                  <h3>{village.village_name}</h3>

                  <p>
                    Affected People:{' '}
                    {village.affected_people}
                  </p>
                </div>
              </div>

              <span
                className={`village-status ${
                  riskStatus === 'high'
                    ? 'high-status'
                    : riskStatus === 'medium'
                    ? 'medium-status'
                    : 'low-status'
                }`}
              >
                {riskStatus.toUpperCase()}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default VillageOverview