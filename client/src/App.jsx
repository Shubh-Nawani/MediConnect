import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './components/Register';
import Login from './components/Login';
import LabTests from './components/LabTests';
import BookTest from './components/BookTest';
import MyBookings from './components/MyBookings';
import AuthCallback from './components/AuthCallback';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LabTests />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book" element={<BookTest />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
