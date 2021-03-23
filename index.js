const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence typeDefs) that together define the shape of queries executed against your data

const typeDefs = gql`
  # Comments start with hash

  # We create a 'Book' type, defining the fields we can query
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

// Defining the data itself (hardcode for example)
// Apollo Server can fetch data from any source you connect to (including a database, a REST API, a static object storage service, or even another GraphQL server).

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];
// Notice that the two objects in the array each match the structure of the Book type we defined in our schema.

// Resolvers define the technique for fetching the types defined in the schema. This resolver retrieves books from the "books" array above
const resolvers = {
  Query: {
    books: () => books,
  },
};

// The ApolloServer constructor takes two parameters, schema definition and set of resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server
server.listen().then(({ url }) => {
  console.log(`Server ready to go at ${url}`);
});
