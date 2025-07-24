import React from 'react';
import JobForm from './components/JobForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobPage from './pages/JobPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobPage />} />
      </Routes>
    </Router>
  );
}


export default App;
