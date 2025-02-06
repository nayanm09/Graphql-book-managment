const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");

// Sample Data
const books = [
    { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: "2", title: "1984", author: "George Orwell" },
];

// Define GraphQL Schema
const typeDefs = gql`
    type Book {
        id: ID!
        title: String!
        author: String!
    }

    type Query {
        books: [Book]
    }

    type Mutation {
        addBook(title: String!, author: String!): Book
        updateBook(id: ID!, title: String!, author: String!): Book
        deleteBook(id: ID!): String
    }
`;

// Define Resolvers (How to Fetch and Modify Data)
const resolvers = {
    Query: {
        books: () => books,
    },
    Mutation: {
        addBook: (_, { title, author }) => {
            const newBook = { id: String(books.length + 1), title, author };
            books.push(newBook);
            return newBook;
        },
        updateBook: (_, { id, title, author }) => {
            const book = books.find(b => b.id === id);
            if (!book) throw new Error("Book not found");

            book.title = title || book.title;
            book.author = author || book.author;
            return book;
        },
        deleteBook: (_, { id }) => {
            const index = books.findIndex(b => b.id === id);
            if (index === -1) throw new Error("Book not found");

            books.splice(index,1);//delete a book from array
            return "Book Deleted Successfully";
        }
    }
};

// Create Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/graphql`));
}

// Create an Express app
const app = express();
app.use(cors()); // Enable CORS (allows requests from frontend)

startServer();
