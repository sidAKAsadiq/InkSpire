import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logout_button, Container, Logo } from '../index';
import Search_ani from '../Search_ani';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user_authentication_status = useSelector((state) => state.auth.is_authenticated);
    const navigate = useNavigate();
    const location = useLocation();

    const navbar_items = [
        {
            name: 'Home',
            slug: '/',
            is_active: true,
        },
        {
            name: 'Login',
            slug: '/login',
            is_active: !user_authentication_status,
        },
        {
            name: 'Sign Up',
            slug: '/signup',
            is_active: !user_authentication_status,
        },
        {
            name: 'All posts',
            slug: 'all-posts',
            is_active: user_authentication_status,
        },
        {
            name: 'My posts',
            slug: 'my-posts',
            is_active: user_authentication_status,
        },
        {
            name: 'Add post',
            slug: 'add-post',
            is_active: user_authentication_status,
        },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="py-4 bg-blue-950 shadow-md">
            <Container>
                <nav className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/">
                            <Logo width="100px" />
                        </Link>
                        {/* Add space between logo and search bar */}
                        <div className="hidden md:flex ml-4">
                            {location.pathname === '/all-posts' || location.pathname === '/my-posts' ? (
                                <Search_ani />
                            ) : null}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                        >
                            ☰
                        </button>
                    </div>
                    <ul
                        className={`${
                            isMenuOpen ? 'block' : 'hidden'
                        } md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ml-auto items-center`}
                    >
                        {navbar_items.map(
                            (each_item) =>
                                each_item.is_active && (
                                    <li key={each_item.name}>
                                        <button
                                            onClick={() => {
                                                navigate(each_item.slug);
                                                setIsMenuOpen(false);
                                            }}
                                            className="inline-block px-6 py-2 text-white duration-200 hover:bg-blue-500 hover:text-white rounded-full"
                                        >
                                            {each_item.name}
                                        </button>
                                    </li>
                                )
                        )}
                    </ul>
                    {user_authentication_status && (
                        <div className="ml-4">
                            <Logout_button />
                        </div>
                    )}
                </nav>
                {/* Ensure Search_ani appears on mobile and desktop */}
                {(location.pathname === '/all-posts' || location.pathname === '/my-posts') && (
                    <div className="md:hidden flex justify-center mt-4">
                        <Search_ani />
                    </div>
                )}
            </Container>
        </header>
    );
}

export default Header;
