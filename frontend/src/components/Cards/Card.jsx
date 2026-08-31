import './Card.css'

function Card({ title, value, icon }) {
  return (
    <div className="dashboard-card">
      <div className="card-icon">
        {icon}
      </div>

      <div className="card-info">
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  )
}

export default Card