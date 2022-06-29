const { ApolloServer } = require('apollo-server');

const users = [
    {
        githubLogin: 'mHattrup',
        name: 'Mike Hattrup',
    },
    {
        githubLogin: 'bluemiv',
        name: 'Taehong Kim',
    },
];

const photos = [
    {
        id: 1,
        name: 'Dropping the Heart Chute',
        description: 'The heart chute is one of my favorite chutes',
        category: 'ACTION',
        githubUser: 'mHattrup',
    },
    {
        id: 2,
        name: 'Enjoying the sunshine',
        category: 'SELFIE',
        githubUser: 'bluemiv',
    },
];

const typeDefs = `
  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
  }

  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }
  
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
  }
  
  type Query {
      totalPhotos: Int!
      allPhotos: [Photo!]!
  }
  
  input PostPhotoInput {
    name: String!
    category: PhotoCategory=PORTRAIT
    description: String
    githubUser: String!
  }
  
  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
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
                id: photos.length + 1,
                ...args.input,
            };
            photos.push(newPhoto);
            return newPhoto;
        },
    },
    Photo: {
        url: (parent) => `http://yoursite.com/img/${parent.id}.jpg`,
        postedBy: (parent) => users.find((user) => user.githubLogin === parent.githubUser),
    },
    User: {
        postedPhotos: (parent) => {
            console.log(parent);
            return photos.filter((photo) => photo.githubUser === parent.githubLogin);
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
