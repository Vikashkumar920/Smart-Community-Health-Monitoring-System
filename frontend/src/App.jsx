import { useState, useEffect } from 'react'
import axios from 'axios'

import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Card from './components/Cards/Card'
import AlertBox from './components/AlertBox/AlertBox'
import HealthSummary from './components/HealthSummary/HealthSummary'
import RecentReports from './components/RecentReports/RecentReports'
import RiskOverview from './components/RiskOverview/RiskOverview'
import VillageOverview from './components/VillageOverview/VillageOverview'
import WaterQuality from './components/WaterQuality/WaterQuality'
import HealthReports from './components/HealthReports/HealthReports'
import ReportForm from './components/ReportForm/ReportForm'
import OutbreakAlerts from './components/OutbreakAlerts/OutbreakAlerts'
function App() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalHospitals: 0,
    activeAlerts: 0,
    totalHealthRecords: 0,
    totalWaterRecords: 0
  })

  const [alerts, setAlerts] = useState([])

  const [reports, setReports] = useState([])
  useEffect(() => {
  fetchDashboard()
  fetchAlerts()
  fetchReports()
}, [])

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/dashboard'
      )

      setDashboard(response.data)
    } catch (error) {
      console.error('Dashboard fetch failed:', error)
    }
  }

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/alerts'
      )

      const activeAlerts = response.data
        .filter(alert => alert.status === 'active')
        .slice(0, 2)

      setAlerts(activeAlerts)
    } catch (error) {
      console.error('Alerts fetch failed:', error)
    }
  }
const fetchReports = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/health-records/recent'
    )

    const formattedReports = response.data.map(record => {
      let risk = 'LOW'

      if (
        Number(record.oxygen_level) < 95 ||
        Number(record.temperature) > 38 ||
        Number(record.heart_rate) > 120
      ) {
        risk = 'HIGH'
      }

      return {
        village: `Patient ${record.user_id}`,
        symptoms: `Temp ${record.temperature}°C`,
        risk,
        date: new Date(
          record.recorded_at
        ).toLocaleDateString()
      }
    })

    setReports(formattedReports)
  } catch (error) {
    console.error('Reports fetch failed:', error)
  }
}
 const handleReportSubmit = () => {
  fetchReports()
  fetchDashboard()
  fetchAlerts()
}

   
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
              title="Total Users"
              value={dashboard.totalUsers}
              icon="👥"
            />

            <Card
              title="Doctors"
              value={dashboard.totalDoctors}
              icon="🩺"
            />

            <Card
              title="Health Records"
              value={dashboard.totalHealthRecords}
              icon="📋"
            />

            <Card
              title="Active Alerts"
              value={dashboard.activeAlerts}
              icon="🚨"
            />
          </div>

          {alerts.map(alert => (
            <AlertBox
              key={alert.id}
              type={alert.severity}
              title={alert.alert_type}
              message={alert.message}
            />
          ))}

          <HealthSummary />

          <RecentReports reports={reports} />

          <RiskOverview />

          <VillageOverview />

          <WaterQuality />

          <HealthReports />

          <ReportForm onReportSubmit={handleReportSubmit} />
        </main>
      </div>
    </>
  )
}

export default App