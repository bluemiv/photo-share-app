import React from 'react';

interface UserListItemProps {
    name: string;
    avatar: string;
}

const UserListItem: React.FC<UserListItemProps> = ({ name, avatar }) => {
    return (
        <li>
            <img src={avatar} width={48} height={48} alt="github profile" />
            <span>{name}</span>
        </li>
    );
};

export default UserListItem;
