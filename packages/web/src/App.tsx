import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Users } from './users';
import { AuthorizedUser } from './auth';
import { NotFound } from './error';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/auth" element={<AuthorizedUser />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
