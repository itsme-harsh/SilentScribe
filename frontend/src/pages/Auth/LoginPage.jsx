import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/Auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

const LoginPage = () => {

  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);


  const handleSubmit = (e) => {

    if (isAuthenticated) {
      // If already authenticated, no need to redirect or blink.
      return;
    }

    e.preventDefault();
    if (!email || !password) {
      setErrors('Please fill in all fields');
      showToast('Please fill all the fields', 'error');
      return;
    }

    dispatch(loginUser({ email, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        showToast(result.payload.message, 'success');

        navigate('/'); // Redirect on successful login
      }else{
        showToast(result.payload.message || "something went wrong" , 'error')
      }
    });
  };

  return (
    <div className="flex md:h-screen items-center justify-center bg-white dark:bg-black py-12">
      <div className="bg-white dark:bg-black p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Login</h2>
        {errors && <p className="text-red-500 text-sm mb-4">{errors}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-sm text-center dark:text-gray-300">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
