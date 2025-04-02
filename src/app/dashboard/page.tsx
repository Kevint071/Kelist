import ProtectedRoute from "@/components/ProtectedRoute";

function Dashboard() {
  return (
    <ProtectedRoute>
      <div>Dashboard</div>
    </ProtectedRoute>
  );
}

export default Dashboard;
