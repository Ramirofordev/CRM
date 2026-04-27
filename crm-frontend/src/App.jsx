import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Customers from "./pages/Customers";
import Opportunities from "./pages/Opportunities";
import Activities from "./pages/Activities";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function Dashboard() {
  return <h1>Dashboard</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* public */}
        <Route path = "/login" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />

        {/* private */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Customers />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path = "/opportunities"
          element = {
            <ProtectedRoute>
              <MainLayout>
                <Opportunities />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path = "/activities"
          element = {
            <ProtectedRoute>
              <MainLayout>
                <Activities />
              </MainLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;