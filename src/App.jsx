import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/login/login';
import Home from './component/home/home';
import Sidebar from './component/sidebar/sidebar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes that don't use the Sidebar */}
        <Route path="/login" element={<Login />} />

        {/* Routes that use the Sidebar */}
        <Route
          path="/*"
          element={
            <div style={{ display: 'flex' }}>
              {/* Sidebar is fixed on the left */}
              <Sidebar />

              {/* Main content area */}
              <div style={{ marginLeft: '300px', width: '100%' }}>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  {/* Add other routes here */}
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
