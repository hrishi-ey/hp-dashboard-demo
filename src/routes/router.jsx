import { createBrowserRouter, createRoutesFromElements, Link, Route } from "react-router-dom"
import ProtectedRoutes from "../components/ProtectedRoutes"
import ErrorBoundary from "../components/ErrorBoundary"
import Root from "../pages/Root"
import Login from "../pages/Login"
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"
import DashboardRoot from "../pages/DashboardRoot"
import Dashboard from "../pages/Dashboard"
import NoMatch from "../pages/NoMatch"
import Assets from "../pages/Assets"
import Device from "../pages/Device"
import Uptime from "../pages/Uptime"
import Operation from "../pages/Operation"
import Efficiency from "../pages/Efficiency"
import Notifications from "../pages/Notifications"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route path="" element={<Login />} index={true} />
    <Route path="/forgot-password" element={<ForgotPassword />} index={true} />
    <Route path="/reset-password/:key" element={<ResetPassword />} index={true} />

    <Route path="dashboard" element={<ProtectedRoutes><DashboardRoot /></ProtectedRoutes>}>
      <Route path="" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} index={true} handle={{ crumb: () => <Link to="/dashboard">Dashboard</Link> }} />
      <Route path="/dashboard/device/:id" element={<ProtectedRoutes><Device /></ProtectedRoutes>} handle={{ crumb: (data) => <span>Device</span>}} />
      <Route path="/dashboard/:dataType/:id" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} handle={{ crumb: (data) => <span>Dashboard with data type</span>}} />
      <Route path="assets" element={<ProtectedRoutes><Assets /></ProtectedRoutes>} handle={{ crumb: () => <Link to="/dashboard/assets">Assets</Link>}} />
      <Route path="uptime" element={<ProtectedRoutes><Uptime /></ProtectedRoutes>} handle={{ crumb: () => <Link to="/dashboard/uptime">Uptime</Link>}} />
      <Route path="operation" element={<ProtectedRoutes><Operation /></ProtectedRoutes>} handle={{ crumb: () => <Link to="dashboard/operation">Operation</Link>}} />
      <Route path="efficiency" element={<ProtectedRoutes><Efficiency /></ProtectedRoutes>} handle={{ crumb: () => <Link to="/dashbaord/efficiency">Efficiency</Link>}} />
      <Route path="notifications" element={<ProtectedRoutes><Notifications /></ProtectedRoutes>} handle={{ crumb: () => <Link to="/dashbaord/notifications">Notifications</Link>}} />
    </Route>
    <Route path="*" element={<NoMatch />} />
  </Route>
));

export default router;