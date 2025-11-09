import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/Toast';
import { Router, Route } from './components/Router';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/admin/login">
            <AdminLoginPage />
          </Route>
          <Route path="/admin">
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          </Route>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
