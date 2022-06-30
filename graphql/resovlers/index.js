const { GraphQLScalarType } = require('graphql');

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
        created: '3-28-2020',
    },
    {
        id: 2,
        name: 'Enjoying the sunshine',
        category: 'SELFIE',
        githubUser: 'bluemiv',
        created: '2022-06-27T16:45:11.123Z',
    },
];

const tags = [
    { photoId: 1, userId: 'bluemiv' },
    { photoId: 2, userId: 'mHattrup' },
];

const resolvers = {
    Query: {
        totalPhotos: (parent, args, { db }) => db.collection('photos').estimatedDocumentCount(),
        allPhotos: (parent, args, { db }) => db.collection('photos').find().toArray(),
        totalUsers: (parent, args, { db }) => db.collection('users').estimatedDocumentCount(),
        allUsers: (parent, args, { db }) => db.collection('users').find().toArray(),
    },
    Mutation: {
        postPhoto(parent, args) {
            const newPhoto = {
                id: photos.length + 1,
                created: new Date(),
                ...args.input,
            };
            photos.push(newPhoto);
            return newPhoto;
        },
    },
    Photo: {
        url: (parent) => `http://yoursite.com/img/${parent.id}.jpg`,
        postedBy: (parent) => users.find((user) => user.githubLogin === parent.githubUser),
        taggedUsers: (parent) =>
            tags
                .filter((tag) => tag.photoId === parent.id)
                .map((tag) => tag.userId)
                .map((userId) => users.find((user) => user.githubLogin === userId)),
    },
    User: {
        postedPhotos: (parent) => photos.filter((photo) => photo.githubUser === parent.githubLogin),
        inPhotos: (parent) =>
            tags
                .filter((tag) => tag.userId === parent.id)
                .map((tag) => tag.photoId)
                .map((photoId) => photos.find((photo) => photo.id === photoId)),
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A valid date time value',
        parseValue: (value) => new Date(value),
        serialize: (value) => new Date(value).toISOString(),
        parseLiteral: (ast) => ast.value,
    }),
};

module.exports = resolvers;
