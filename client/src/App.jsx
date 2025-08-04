import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import ProtectedLanding from './components/ProtectedLanding';
import Register from './components/Register';
import Login from './components/Login';
import LabTests from './components/LabTests';
import BookTest from './components/BookTest';
import MyBookings from './components/MyBookings';
import AuthCallback from './components/AuthCallback';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ProtectedLanding />} />
            <Route path="/tests" element={<LabTests />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/book" element={<BookTest />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
