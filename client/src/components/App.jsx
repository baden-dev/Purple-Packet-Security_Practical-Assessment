import { Routes, Route } from "react-router-dom";
import Navbar from "./NavBar";
import AgentsPage from "./AgentPage/AgentsPage";
import HardwareTable from "./HardwarePage";
import SoftwareTable from "./SoftwarePage";
import VulnerabilitiesTable from "./VulnerabilitiesPage";
import "../css/App.css";

function App() {
  return (
    <>
      <div className="page-content">
        <Navbar />
        <Routes>
          <Route path="/" element={<AgentsPage/>} />
          <Route path="/hardware" element={<HardwareTable/>} />
          <Route path="/software" element={<SoftwareTable/>} />
          <Route path="/vulnerabilities" element={<VulnerabilitiesTable/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
