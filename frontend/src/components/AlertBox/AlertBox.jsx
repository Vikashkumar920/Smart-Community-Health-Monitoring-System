import './AlertBox.css'

function AlertBox({ type, title, message }) {
  return (
    <div className={`alert-box ${type}`}>
      <div className="alert-icon">
        {type === 'high' ? '!' : type === 'medium' ? '!' : '✓'}
      </div>

      <div className="alert-content">
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default AlertBox