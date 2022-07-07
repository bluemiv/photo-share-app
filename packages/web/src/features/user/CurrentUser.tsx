import React from 'react';

interface CurrentUserProps {
    me: {
        githubLogin: string;
        name: string;
        avatar: string;
    };
}

const CurrentUser: React.FC<CurrentUserProps> = ({ me }) => {
    const { avatar, githubLogin, name } = me;
    return (
        <div>
            <img src={avatar} width={48} height={48} alt="github profile" />
            <p>
                {name}({githubLogin})
            </p>
        </div>
    );
};

export default CurrentUser;
