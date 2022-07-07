import { gql } from '@apollo/client';

export const GITHUB_AUTH_MUTATION = gql`
    mutation githubAuth($code: String!) {
        githubAuth(code: $code) {
            token
        }
    }
`;
