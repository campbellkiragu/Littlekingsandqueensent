import { ToastProvider } from './components/Toast';
import { Router, Route } from './components/Router';
import { HomePage } from './pages/HomePage';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/admin">
          <AdminDashboard />
        </Route>
      </Router>
    </ToastProvider>
  );
}

export default App;
