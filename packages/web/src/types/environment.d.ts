export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_GRAPHQL_ENTRY: string;
            REACT_APP_CLIENT_ID: string;
        }
    }
}
