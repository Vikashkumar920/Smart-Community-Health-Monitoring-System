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

function App() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalHospitals: 0,
    activeAlerts: 0,
    totalHealthRecords: 0,
    totalWaterRecords: 0
  })

  const [reports, setReports] = useState([
    {
      village: 'Rampur',
      symptoms: 'Fever, Diarrhea',
      risk: 'HIGH',
      date: 'Today'
    },
    {
      village: 'Lakshmipur',
      symptoms: 'Fever',
      risk: 'MEDIUM',
      date: 'Today'
    },
    {
      village: 'Shivpur',
      symptoms: 'Normal',
      risk: 'LOW',
      date: 'Yesterday'
    }
  ])

  useEffect(() => {
    fetchDashboard()
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

  const handleReportSubmit = () => {
    const newReport = {
      village: 'New Village',
      symptoms: 'Fever',
      risk: 'MEDIUM',
      date: 'Today'
    }

    setReports([newReport, ...reports])
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

          <AlertBox
            type="high"
            title="Backend Connected"
            message="Dashboard data is coming from API"
          />

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