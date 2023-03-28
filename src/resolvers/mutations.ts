import {Picture, Resolvers} from "../__generated__/resolver-types";

function getPrompt(): string {
  return 'an anime girl';
}

const mutations: Resolvers = {
  Mutation: {
    createPicture: async (parent, args, {dataSources}): Promise<Picture> => {
      console.log({parent, args, dataSources});
      try {
        const response = await dataSources.openAI.createImage({
          prompt: getPrompt(),
          n: 1,
          size: "1024x1024"
        });
        return {
          uri: response.data.data[0].url,
        }
      } catch (e) {
        console.error(e);
      }
      return null;
    }
  },
};

export default mutations;
