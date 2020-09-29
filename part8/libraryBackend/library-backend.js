require('dotenv').config();
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const pubsub = new PubSub();

console.log('connecting to', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message);
    });

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Author {
        id: ID!
        name: String!
        born: Int
        bookCount: Int
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }     

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
        favorites: [Book!]
    }

    type Mutation {
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        login(
            username: String!
            password: String!
        ): Token
    }

    type Subscription {
        bookAdded: Book!
    }
`

const resolvers = {
    Query: {
        bookCount: async () => (await Book.find({})).length,
        authorCount: async () => (await Author.find({})).length,
        allBooks: (root, args) => {
            return Book.find({}).populate('author');
        },
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => context.currentUser,
        favorites: async (root, args, context) => {
            const user = context.currentUser;
            if(!user) {
                return null;
            }
            const all = await Book.find({}).populate('author');
            return all.filter(book => book.genres.includes(user.favoriteGenre));
        }
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({ author: { _id: root._id } });
            return books.length;
        }
    },
    Mutation: {
        createUser: (root, args) => {
            const nextUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre });
            return nextUser.save()
                .catch(err => {
                    throw new UserInputError(err.message, {
                        invalidArgs: args
                    });
                });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });
            if (!user || args.password !== 'secred') {
                throw new UserInputError("wrong credentials");
            }
            const userForToken = {
                username: user.username,
                id: user._id,
            };
            return { value: jwt.sign(userForToken, "SUPER_SECRET") };
        },
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError('Not authenticated');
            }
            let whoWrote = await Author.findOne({ name: args.author });
            if (!whoWrote) {
                whoWrote = new Author({ name: args.author });
                try {
                    await whoWrote.save();
                } catch (err) {
                    throw new UserInputError(err.message, {
                        invalidArgs: args
                    });
                }
            }
            const book = new Book({
                title: args.title,
                published: args.published,
                genres: args.genres
            });
            book.author = whoWrote;
            try {
                await book.save();
            } catch (err) {
                throw new UserInputError(err.message, {
                    invalidArgs: args
                });
            }
            pubsub.publish('BOOK_ADDED', { bookAdded: book });
            return book;
        },
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new AuthenticationError('Not authenticated');
            }
            const nextAuthor = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true });
            return nextAuthor;
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), "SUPER_SECRET"
            )
            const currentUser = await User.findById(decodedToken.id).populate('friends')
            return { currentUser }
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
