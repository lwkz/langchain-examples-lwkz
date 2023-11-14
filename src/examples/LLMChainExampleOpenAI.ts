import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();

export const LLMChainExampleOpenAI = async () => {

  // Instantiate the OpenAI model 
  const model = new OpenAI({
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY,
    verbose: true,
  });

  const template = "What is a good name for a company that makes {product}?";
  const prompt = new PromptTemplate({ template, inputVariables: ["product"] });

  // Instantiate LLMChain, which consists of a PromptTemplate and an LLM. Pass
  // the result from the PromptTemplate and the OpenAI LLM model
  const chain = new LLMChain({ llm: model, prompt });

  const res = await chain.call({ product: "chocolate peanuts" });
  console.dir({ res });
};
