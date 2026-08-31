import { useState } from 'react'
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
import dashboardData from './data/dashboardData'

function App() {
  const [totalReports, setTotalReports] = useState(
    dashboardData.totalReports
  )

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

  const handleReportSubmit = () => {
    setTotalReports(totalReports + 1)

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
              title="Total Villages"
              value={dashboardData.totalVillages}
              icon="🏘️"
            />

            <Card
              title="Total Reports"
              value={totalReports}
              icon="📋"
            />

            <Card
              title="High Risk Areas"
              value={dashboardData.highRiskAreas}
              icon="⚠️"
            />

            <Card
              title="Active Alerts"
              value={dashboardData.activeAlerts}
              icon="🚨"
            />
          </div>

          <AlertBox
            type="high"
            title="High Risk Alert"
            message="High contamination detected in Rampur3"
          />

          <AlertBox
            type="medium"
            title="Water Quality Warning"
            message="Water quality requires attention"
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