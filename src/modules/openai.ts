import { Configuration, OpenAIApi } from 'openai';
import dotenv from "dotenv"
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('config openai', configuration);
const openai = new OpenAIApi(configuration);
export default openai;