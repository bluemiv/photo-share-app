const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const fs = require('fs');

const typeDefs = fs.readFileSync('./graphql/typeDefs.graphql', {
    encoding: 'utf8',
});
const resolvers = require('./graphql/resovlers');

const startServer = async (typeDefs, resolvers) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();

    const app = express();
    server.applyMiddleware({ app, path: '/graphql' });

    app.get('/', (req, res) => res.end('PhotoShare API에 오신 것을 환영합니다.'));
    app.get('/playground', expressPlayground({ endpoint: server.graphqlPath }));

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at https://localhost:4000${server.graphqlPath}`)
    );
};

startServer(typeDefs, resolvers);
