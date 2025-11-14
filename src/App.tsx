import { Router, Route } from './components/Router';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { HomePage } from './pages/HomePage'; // your home page component

function App() {
  return (
    <Router>
      {/* Home page */}
      <Route path="/">
        <HomePage />
      </Route>

      {/* Admin login page */}
      <Route path="/admin/login">
        <AdminLoginPage />
      </Route>

      {/* Admin dashboard */}
      <Route path="/admin">
        <AdminDashboard />
      </Route>
    </Router>
  );
}

export default App;
