import React from 'react';
import UserListItem from './UserListItem';

interface UserListProps {
    count: number;
    users: {
        githubLogin: string;
        name: string;
        avatar: string;
    }[];
}

const UserList: React.FC<UserListProps> = ({ count, users }) => {
    return (
        <div>
            <p>{count} Users</p>
            <ul>
                {users.map(({ githubLogin, name, avatar }) => (
                    <UserListItem key={githubLogin} name={name} avatar={avatar} />
                ))}
            </ul>
        </div>
    );
};

export default UserList;
