import React from 'react'
import ClientLogin from './components/client/ClientLogin'
import ClientSignup from './components/client/ClientSignup'
import ClientDashboard from './components/client/ClientDashboard'
import AdminLogin from './components/admin/AdminLogin'
import AdminSignup from './components/admin/AdminSignup'
import AdminDashboard from './components/admin/AdminDashboard'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <>
      <Routes>
        <Route exact path='/' element={<ClientLogin/>}/>
        <Route exact path='/clientsignup' element={<ClientSignup/>}/>
        <Route exact path='/clientdashboard' element={<ClientDashboard/>}/>
        <Route exact path='/adminlogin' element={<AdminLogin/>}/>
        <Route exact path='/adminsignup' element={<AdminSignup/>}/>
        <Route exact path='/admindashboard' element={<AdminDashboard/>}/>
     </Routes>
     </>
    </Router>
  );
}

export default App;
