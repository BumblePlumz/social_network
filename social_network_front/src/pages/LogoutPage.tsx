import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    navigate('/Authentification?mode=login');
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null; // Peut-être afficher un message de déconnexion ici
};

export default LogoutPage;
