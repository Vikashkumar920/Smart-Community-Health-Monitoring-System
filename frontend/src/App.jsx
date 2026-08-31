import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Card from './components/Cards/Card'

function App() {
  return (
    <>
      <Navbar />

      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <h1>ArogyaAlert Dashboard</h1>
          <p>Smart Community Health Monitoring System</p>

          <div className="dashboard-cards">
            <Card
              title="Total Villages"
              value="25"
              icon="🏘️"
            />

            <Card
              title="Total Reports"
              value="120"
              icon="📋"
            />

            <Card
              title="High Risk Areas"
              value="5"
              icon="⚠️"
            />

            <Card
              title="Active Alerts"
              value="8"
              icon="🚨"
            />
          </div>
        </main>
      </div>
    </>
  )
}

export default App