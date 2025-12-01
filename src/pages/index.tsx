import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/api';
import Button from '../components/Button';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-[95%] sm:max-w-md bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden p-6 sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Welcome to DigiLib! You are successfully logged in.</p>

          <Button
            variant="secondary"
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard