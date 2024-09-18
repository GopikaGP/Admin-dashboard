import {  Route, Routes,Navigate } from 'react-router-dom';
import Auth from './components/Login'; 
import Dashboard from './components/Dashboard' // Assuming Auth handles both login and register
import Complaints from './components/Complants';
import Home from './page/Home'

import GrievanceDetail from './components/GrievanceDetails';
import ReplyForm from './components/ReplyForm';

function App() {
  return (
  
    <Routes>
    {/* Route for login */}
    <Route path="/login" element={<Auth register={false} />} />
    
    {/* Route for registration */}
    <Route path="/register" element={<Auth register={true} />} />

    {/* Protect the dashboard and child routes */}
    <Route path="/dashboard" element={<Dashboard />}>
      {/* Child routes */}
      <Route path="home" element={<Home />} />
      <Route path="complaints" element={<Complaints />} /> {/* Path should match the Nav.Link */}
      <Route path="complaints/:id" element={<GrievanceDetail />} />
      <Route path="/dashboard/complaints/:id/reply" element={<ReplyForm/>} />
    </Route>

    {/* Default route or fallback */}
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
  
  );
}

export default App;
