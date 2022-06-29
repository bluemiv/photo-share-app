const { ApolloServer } = require('apollo-server');

let _id = 0;
const photos = [];

const typeDefs = `
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }
  type Query {
      totalPhotos: Int!
      allPhotos: [Photo!]!
  }
  type Mutation {
    postPhoto(name: String! description: String): Photo!
  }
`;

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos,
    },
    Mutation: {
        postPhoto(parent, args) {
            const newPhoto = {
                id: _id++,
                ...args,
            };
            photos.push(newPhoto);
            return newPhoto;
        },
    },
    Photo: {
        url: (parent) => `http://yoursite.com/img/${parent.id}.jpg`,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
