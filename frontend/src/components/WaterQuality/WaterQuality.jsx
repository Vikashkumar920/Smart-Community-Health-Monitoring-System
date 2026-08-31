import { useState, useEffect } from 'react'
import axios from 'axios'
import './WaterQuality.css'

function WaterQuality() {
  const [waterData, setWaterData] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/water-quality')
      .then((res) => {
        const uniqueVillages = []
        const seen = new Set()

        res.data.forEach((item) => {
          if (!seen.has(item.village_name)) {
            seen.add(item.village_name)
            uniqueVillages.push(item)
          }
        })

        setWaterData(uniqueVillages.slice(0, 3))
      })
      .catch((err) => {
        console.error('Water Quality API Error:', err)
      })
  }, [])

  return (
    <section className="water-quality">
      <div className="water-header">
        <div>
          <h2>Water Quality Monitoring</h2>
          <p>Latest water quality status across monitored villages</p>
        </div>

        <span className="water-status">
          Monitoring Active
        </span>
      </div>

      <div className="water-grid">
        {waterData.map((item) => (
          <div className="water-card" key={item.id}>
            <div className="water-card-top">
              <span className="water-icon">💧</span>

              <span
                className={
                  item.risk_status === 'high'
                    ? 'quality-poor'
                    : item.risk_status === 'medium'
                    ? 'quality-medium'
                    : 'quality-good'
                }
              >
                {item.risk_status.toUpperCase()}
              </span>
            </div>

            <h3>{item.village_name}</h3>

            <p>
              pH: {item.ph_level} | Turbidity: {item.turbidity}
            </p>

            <div className="water-value">
              <span>Contamination Level</span>
              <strong>{item.contamination_level}%</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WaterQuality