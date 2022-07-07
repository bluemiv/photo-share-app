import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const isAuth = !!localStorage.getItem('token');
    const linkList = [
        { label: 'Home', link: '/' },
        { label: 'User', link: '/user' },
    ];

    if (!isAuth) {
        linkList.push({ label: 'Login', link: '/auth' });
    }

    return (
        <ul>
            {linkList.map(({ label, link }) => (
                <li key={link}>
                    <Link to={link}>{label}</Link>
                </li>
            ))}
            {isAuth && (
                <li>
                    <button onClick={() => localStorage.removeItem('token')}>Logout</button>
                </li>
            )}
        </ul>
    );
};

export default Home;
