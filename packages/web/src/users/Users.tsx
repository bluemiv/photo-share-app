import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ROOT_QUERY } from './constants/gql';
import UserList from './UserList';
import UserAddButton from './UserAddButton';

const Users: React.FC = () => {
    const [isPolling, setPolling] = useState(false);

    const { loading, error, data, refetch, startPolling, stopPolling } = useQuery(ROOT_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const onTogglePolling = () => {
        if (isPolling) {
            stopPolling();
        } else {
            startPolling(3000);
        }
        setPolling(!isPolling);
    };

    return (
        <div>
            <div>
                <button onClick={() => refetch()}>Refetch</button>
            </div>
            <div>
                <button onClick={onTogglePolling}>
                    {isPolling ? 'Stop polling' : 'Start polling'}
                </button>
            </div>
            <div>
                <UserAddButton />
            </div>
            <UserList count={data.totalUsers} users={data.allUsers} />
        </div>
    );
};

export default Users;
