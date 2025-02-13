import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeProvider'; // Assuming you have a theme context

const NotFoundPage = () => {
  const { theme } = useTheme(); // Get current theme

  return (
    <div
      className={`flex items-center justify-center min-h-[calc(100vh-10vh)] ${
        theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className={`inline-block py-2 px-4 rounded-lg border-2 transition-colors ${
            theme === 'light'
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-blue-700 text-white hover:bg-blue-600'
          }`}
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
