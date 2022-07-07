import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { GITHUB_AUTH_MUTATION } from './constants/gql';

const requestCode = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const githubLoginUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope-user`;
    window.location.href = githubLoginUrl;
};

const AuthorizedUser: React.FC = () => {
    const [githubAuthFuc, { loading, error }] = useMutation(GITHUB_AUTH_MUTATION);
    const { search } = useLocation();
    const [code, setCode] = useState<string>('');

    useEffect(() => {
        const params: { code?: string } = search
            .split(/\?|&/)
            .filter((v) => !!v)
            .reduce((acc, v) => {
                const [key, value] = v.split('=').map((s) => s.toLowerCase());
                return {
                    ...acc,
                    [key]: value,
                };
            }, {});

        const { code } = params;
        if (!code) return;
        setCode(code);
    });

    const fetchGithubAuth = async (code: string) => {
        const {
            data: {
                githubAuth: { token },
            },
        } = await githubAuthFuc({
            variables: {
                code,
            },
        });
        localStorage.setItem('token', token);
    };

    useEffect(() => {
        if (!code) return;
        fetchGithubAuth(code).then(() => {
            window.location.href = '/';
        });
    }, [code]);

    if (loading) return <p>Submitting...</p>;
    if (error) return <p>Submit error! :( {`${error.message}`}</p>;

    return (
        <div>
            <button onClick={requestCode}>Github Login</button>
        </div>
    );
};

export default AuthorizedUser;
