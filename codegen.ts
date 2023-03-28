
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/schema.graphql",
  generates: {
    "./src/__generated__/resolver-types.ts": {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
        "typescript",
        "typescript-resolvers"
      ],
      config: {
        useIndexSignature: true,
        contextType: "../index#MyContext",
      }
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  },
};

export default config;
