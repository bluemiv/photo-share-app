import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { ROOT_QUERY } from './constants/gql';
import UserList from './UserList';
import UserAddButton from './UserAddButton';
import CurrentUser from './CurrentUser';

interface UserInfo {
    githubLogin: string;
    name: string;
    avatar: string;
}

interface TotalUsersState {
    totalUsers: number;
    allUsers: [UserInfo];
    me: UserInfo;
}

const Users: React.FC = () => {
    const [isPolling, setPolling] = useState<boolean>(false);
    const [users, setUsers] = useState<TotalUsersState | null>();

    const [
        fetchUsers,
        { called, loading, data, error, refetch, startPolling, stopPolling, client },
    ] = useLazyQuery(ROOT_QUERY);

    useEffect(() => {
        fetchUsers().then(({ data }) => client.cache.writeQuery({ query: ROOT_QUERY, data }));
    }, []);

    useEffect(() => {
        setUsers(data);
    }, [data]);

    if (!called || (called && loading)) return <p>Loading...</p>;
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
            {users?.me && <CurrentUser me={users.me} />}
            <div>
                <button onClick={() => refetch()}>Refetch</button>
            </div>
            <div>
                <button
                    onClick={() => {
                        const cache: TotalUsersState | null = client.cache.readQuery({
                            query: ROOT_QUERY,
                        });

                        if (cache) {
                            console.log(`cache data: ${cache}`);
                            setUsers(cache);
                        }
                    }}
                >
                    Refetch from cache
                </button>
            </div>
            <div>
                <button onClick={onTogglePolling}>
                    {isPolling ? 'Stop polling' : 'Start polling'}
                </button>
            </div>
            <div>
                <UserAddButton />
            </div>
            {users && <UserList count={users.totalUsers} users={users.allUsers} />}
        </div>
    );
};

export default Users;
