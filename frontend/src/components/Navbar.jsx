import { useTheme } from '../context/ThemeProvider'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/Auth/authSlice'; // Assuming logout action is in redux
import { useToast } from '../context/ToastContext';
import UserMenu from './Dropdown';

function Navbar() {
    const { showToast } = useToast();
    const { theme, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleLoginClick = () => {
        if (isAuthenticated) {
            return;
        }
        navigate("/login");
    };

    const handleLogoutClick = () => {
        dispatch(logoutUser()).then((result) => {
            if (result.meta.requestStatus === "fulfilled")
                showToast(result.payload.message, 'success');
            navigate("/login")
        })
    };



    return (
        <div className="w-full bg-white dark:bg-black border-b sticky z-99 top-0 left-0 border-neutral-200 dark:border-neutral-700">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative h-16 flex items-center justify-between">
                    <div className="flex-1 flex items-center justify-between">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl font-bold tracking-wider cursor-pointer">
                                <Link to="/">
                                    <span className="text-black dark:text-white">Silent</span>
                                    <span className="text-blue-500 dark:text-blue-400">Scribe</span>
                                </Link>
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">

                            {/* Favourite Button */}
                            <Link to="Liked">
                                <button className='p-2 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill={theme === 'light' ? '#000' : '#e8eaed'}
                                    >
                                        <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                                    </svg>
                                </button>
                            </Link>

                            {/* Theme Toggle */}
                            <button className="p-2 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300" onClick={toggleTheme}>
                                {
                                    theme === 'light' ?
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" /></svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" /></svg>
                                }
                            </button>

                            {/* Login Button */}
                            {!isAuthenticated && (
                                <button onClick={handleLoginClick} className='cursor-pointer pr-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                        fill={theme === 'light' ? '#000' : '#e8eaed'}>
                                        <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                                    </svg>
                                </button>
                            )}

                            {/* User Menu */}
                            {isAuthenticated && (
                                // <details className="relative">
                                //     <summary className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300 cursor-pointer list-none">
                                //         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                //             fill={theme === 'light' ? '#000' : '#e8eaed'}>
                                //             <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                                //         </svg>
                                //     </summary>
                                //     <div className="absolute right-0 mt-2 w-48 dark:text-white rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black dark:ring-white ring-opacity-5 z-50">
                                //         <div className="py-1">
                                //             <Link to="/blog/add" className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300">Blog</Link>
                                //             <button className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300" onClick={handleLogoutClick}>Sign out</button>
                                //         </div>
                                //     </div>
                                // </details>
                                <UserMenu handleLogoutClick={handleLogoutClick} />
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
