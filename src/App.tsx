// import React from "react";
// import data from "./mockdata.json";
// // import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>Todo App</h1>
//       {JSON.stringify(data)}
//     </div>
//   );
// }

// export default App;

import React, { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import { LoginPage } from "./components/Login/Login";
import { DashboardPage } from "./components/Dashboard/Dashboard";

const App: React.FC<any> = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
