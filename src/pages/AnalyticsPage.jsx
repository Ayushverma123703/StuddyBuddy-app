import AnalyticsDashboard from "../components/AnalyticsDashboard";
import ExportData from "../components/ExportData";

function AnalyticsPage({ sessions, showToast }) {
    return (
        <div>
            <AnalyticsDashboard sessions={sessions} />
            <ExportData sessions={sessions} showToast={showToast} />
        </div>
    );
}

export default AnalyticsPage;