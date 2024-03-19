import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import NotFound from './pages/notFound/NotFound';
import ResetPassword from './pages/resetPassword/ResetPassword';
import { Signup } from '@/pages/signup/Signup';
import { SecureRoute } from '@/components/secureRoute/SecureRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <SecureRoute redirectPath={'/home'}>
              <Dashboard />
            </SecureRoute>
          }
        />
        <Route
          path="/"
          element={
            <SecureRoute redirectPath={'/home'}>
              <Login />
            </SecureRoute>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
