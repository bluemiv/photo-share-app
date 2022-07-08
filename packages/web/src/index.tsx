import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_ENTRY });
const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    });
    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    uri: process.env.REACT_APP_GRAPHQL_ENTRY,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
