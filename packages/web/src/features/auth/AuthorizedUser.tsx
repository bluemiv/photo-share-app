import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AuthorizedUser: React.FC = () => {
    const { search } = useLocation();
    const [code, setCode] = useState<string>('');

    useEffect(() => {
        const codeStr = search
            .split(/\?|&/)
            .filter((v) => !!v)
            .find((v) => v.split('=')[0].toLowerCase() === 'code');
        setCode(codeStr?.split('=')[1] ?? '');
    }, []);

    const requestCode = () => {
        const clientId = process.env.REACT_APP_CLIENT_ID;
        const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope-user`;
        window.location.href = githubLoginUrl;
    };

    return (
        <div>
            <button onClick={requestCode}>Github Login</button>
        </div>
    );
};

export default AuthorizedUser;
