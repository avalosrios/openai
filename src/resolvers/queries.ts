// Use the generated `QueryResolvers` type to type check our queries!
import {QueryResolvers} from "../__generated__/resolver-types";

const queries: QueryResolvers = {
  Query: {
    // Our third argument (`contextValue`) has a type here, so we
    // can check the properties within our resolver's shared context value.
    books: async (_, __, contextValue) => {
      return await contextValue.dataSources.booksAPI.getBooks();
    },
  },
};

export default queries;
