import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, Users, AuthorizedUser, NotFound } from './features';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<Users />} />
            <Route path="/auth" element={<AuthorizedUser />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
