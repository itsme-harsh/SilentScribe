import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeProvider';

const UserMenu = ({ handleLogoutClick } ) => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Toggle menu on icon click
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* Menu Icon */}
            <button 
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300 cursor-pointer"
                onClick={toggleMenu}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill={theme === 'light' ? '#000' : '#e8eaed'}>
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 dark:text-white rounded-md shadow-lg bg-white dark:bg-neutral-800 ring-1 ring-black dark:ring-white ring-opacity-5 z-50">
                    <div className="py-1 justify-content text-center" onClick={toggleMenu}>
                        <Link to="/blog/dashboard" 
                            className="block flex px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300"
                        >
                            Dashboard
                        </Link>
                        <Link to="/blog/add" 
                            className="block flex px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300"
                        >
                            Write blog
                        </Link>
                        <div 
                            className="block px-4 cursor-pointer flex py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300"
                            onClick={handleLogoutClick}
                        >
                            Sign out
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
