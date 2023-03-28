import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from "@apollo/server/standalone";
import {readFileSync} from 'fs';
import resolvers from './resolvers/index.js';
import {MyDataSource} from "./datasources.js";
import openai from "./modules/openai.js";
import {OpenAIApi} from "openai";

export interface MyContext {
  dataSources: {
    openAI: OpenAIApi,
    booksAPI: MyDataSource;
  };
}

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// Note: this uses a path relative to the project's
// root directory, which is the current working directory
// if the server is executed using `npm run`.
const fileURL = new URL('schema.graphql', import.meta.url)
const typeDefs = readFileSync(fileURL, { encoding: 'utf-8' });

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer<MyContext>(server, {
  // eslint-disable-next-line @typescript-eslint/require-await
  context: async () => {
    return {
      // We are using a static data set for this example, but normally
      // this would be where you'd add your data source connections
      // or your REST API classes.
      dataSources: {
        openAI: openai,
        booksAPI: new MyDataSource(),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);