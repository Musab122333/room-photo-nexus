import Navigation from "@/components/Navigation";
import Dashboard from "@/components/dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <>
      <Navigation isAuthenticated={true} user={{ name: "John Doe" }} />
      <Dashboard />
    </>
  );
};

export default DashboardPage;