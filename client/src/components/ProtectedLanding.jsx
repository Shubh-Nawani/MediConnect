import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Landing from './Landing';

function ProtectedLanding() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/tests');
    }
  }, [isLoggedIn, navigate]);

  // If user is logged in, don't render anything (redirect is happening)
  if (isLoggedIn) {
    return null;
  }

  return <Landing />;
}

export default ProtectedLanding;
