export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_GRAPHQL_ENTRY: string;
        }
    }
}
