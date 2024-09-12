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
    <Route path="" element={<ErrorBoundary><Login /></ErrorBoundary>} index={true} />
    <Route path="/forgot-password" element={<ErrorBoundary><ForgotPassword /></ErrorBoundary>} index={true} />
    <Route path="/reset-password/:key" element={<ErrorBoundary><ResetPassword /></ErrorBoundary>} index={true} />

    <Route path="dashboard" element={<ProtectedRoutes><DashboardRoot /></ProtectedRoutes>}>
      <Route path="" element={<ProtectedRoutes><ErrorBoundary><Dashboard /></ErrorBoundary></ProtectedRoutes>} index={true} handle={{ crumb: () => <Link to="/dashboard" /> }} />
      <Route path="/dashboard/device/:id" element={<ProtectedRoutes><ErrorBoundary><Device /></ErrorBoundary></ProtectedRoutes>} handle={{ crumb: (data) => <span>Test</span>}} />
      <Route path="/dashboard/:dataType/:id" element={<ProtectedRoutes><ErrorBoundary><Dashboard /></ErrorBoundary></ProtectedRoutes>} handle={{ crumb: (data) => <span>Test</span>}} />
      <Route path="assets" element={<ProtectedRoutes><ErrorBoundary><Assets /></ErrorBoundary></ProtectedRoutes>} handle={{ crumb: () => <Link to="/assets" />}} />
      <Route path="uptime" element={<ProtectedRoutes><ErrorBoundary><Uptime /></ErrorBoundary></ProtectedRoutes>} handle={{ crumb: () => <Link to="/uptime" />}} />
      <Route path="operation" element={<ProtectedRoutes><ErrorBoundary><Operation /></ErrorBoundary></ProtectedRoutes>} handle={{ crumb: () => <Link to="/dashbaord/operation" />}} />
      <Route path="efficiency" element={<ProtectedRoutes><ErrorBoundary><Efficiency /></ErrorBoundary></ProtectedRoutes>} handle={{ crumb: () => <Link to="/dashbaord/efficiency" />}} />
      <Route path="notifications" element={<ProtectedRoutes><ErrorBoundary><Notifications /></ErrorBoundary></ProtectedRoutes>} handle={{ crumb: () => <Link to="/dashbaord/notification" />}} />
    </Route>
    <Route path="*" element={<NoMatch />} />
  </Route>
));

export default router;