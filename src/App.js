import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/pages/Layout";
import Dashboard from "@/pages/Dashboard";
import Teams from "@/pages/Teams";
import Players from "@/pages/Players";
import Search from "@/pages/Search";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/players" element={<Players />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Layout>
    </Router>
  );
}

