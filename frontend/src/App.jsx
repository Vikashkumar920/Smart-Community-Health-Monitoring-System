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

          <RecentReports />

          <RiskOverview />

          <VillageOverview />

          <WaterQuality />

          <HealthReports />

          <ReportForm />
        </main>
      </div>
    </>
  )
}

export default App