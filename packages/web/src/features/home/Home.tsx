import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const linkList = [
        { label: 'Home', link: '/' },
        { label: 'User', link: '/user' },
        { label: 'Login', link: '/auth' },
    ];
    return (
        <ul>
            {linkList.map(({ label, link }) => (
                <li key={link}>
                    <Link to={link}>{label}</Link>
                </li>
            ))}
        </ul>
    );
};

export default Home;
