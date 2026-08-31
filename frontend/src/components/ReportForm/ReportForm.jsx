import { useState } from 'react'
import './ReportForm.css'

function ReportForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
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
            placeholder="Enter village name"
            required
          />
        </div>

        <div className="form-group">
          <label>Number of Affected People</label>
          <input
            type="number"
            min="1"
            placeholder="Enter number"
            required
          />
        </div>

        <div className="form-group">
          <label>Symptoms</label>
          <select required>
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
          <select required>
            <option value="">Select water quality</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Additional Information</label>
          <textarea
            rows="4"
            placeholder="Describe any additional health concerns..."
          ></textarea>
        </div>

        <div className="form-group">
          <label>Report Date</label>
          <input
            type="date"
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