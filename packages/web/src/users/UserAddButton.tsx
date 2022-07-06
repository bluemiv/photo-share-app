import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAKE_USERS_MUTATION, ROOT_QUERY } from './constants/gql';

interface UserAddButtonProps {}

const UserAddButton: React.FC<UserAddButtonProps> = () => {
    const [addFakeUsers, { error, loading }] = useMutation(ADD_FAKE_USERS_MUTATION, {
        variables: {
            count: 1,
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( {`${error.message}`}</p>;

    return (
        <button
            onClick={() =>
                addFakeUsers({
                    refetchQueries: [
                        {
                            query: ROOT_QUERY,
                        },
                    ],
                })
            }
        >
            사용자 추가
        </button>
    );
};

export default UserAddButton;
