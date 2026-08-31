import { useState } from 'react'
import axios from 'axios'
import './ReportForm.css'

function ReportForm({ onReportSubmit }) {
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    village_name: '',
    water_quality: '',
    symptoms: '',
    affected_people: '',
    report_date: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let contamination = 20
    let ph = 7
    let turbidity = 2

    if (formData.water_quality === 'average') {
      contamination = 60
      turbidity = 6
    }

    if (formData.water_quality === 'poor') {
      contamination = 90
      ph = 5.5
      turbidity = 12
    }

    try {
      await axios.post(
        'http://localhost:5000/api/water-quality',
        {
          village_name: formData.village_name,
          ph_level: ph,
          turbidity: turbidity,
          contamination_level: contamination
        }
      )

      setSubmitted(true)

      if (onReportSubmit) {
        onReportSubmit()
      }

      setFormData({
        village_name: '',
        water_quality: '',
        symptoms: '',
        affected_people: '',
        report_date: ''
      })
    } catch (error) {
      console.error('Report submission failed:', error)
    }
  }

  return (
    <section className="report-form-section" id="report-form">
      <div className="report-form-header">
        <div>
          <h2>Submit Health Report</h2>
          <p>Report health conditions observed in your community</p>
        </div>
      </div>

      {submitted && (
        <div className="success-message">
          Health report submitted successfully.
        </div>
      )}

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Village Name</label>
          <input
            type="text"
            name="village_name"
            value={formData.village_name}
            onChange={handleChange}
            placeholder="Enter village name"
            required
          />
        </div>

        <div className="form-group">
          <label>Number of Affected People</label>
          <input
            type="number"
            name="affected_people"
            value={formData.affected_people}
            onChange={handleChange}
            min="1"
            placeholder="Enter number"
            required
          />
        </div>

        <div className="form-group">
          <label>Symptoms</label>
          <select
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            required
          >
            <option value="">Select symptoms</option>
            <option value="fever">Fever</option>
            <option value="diarrhea">Diarrhea</option>
            <option value="vomiting">Vomiting</option>
            <option value="headache">Headache</option>
            <option value="fever-diarrhea">
              Fever and Diarrhea
            </option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Water Quality</label>
          <select
            name="water_quality"
            value={formData.water_quality}
            onChange={handleChange}
            required
          >
            <option value="">Select water quality</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div className="form-group">
          <label>Report Date</label>
          <input
            type="date"
            name="report_date"
            value={formData.report_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-report-btn"
          >
            Submit Report
          </button>
        </div>
      </form>
    </section>
  )
}

export default ReportForm