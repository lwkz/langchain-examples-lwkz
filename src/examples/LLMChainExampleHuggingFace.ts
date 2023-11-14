import { HuggingFaceInference } from "langchain/llms/hf";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
import { format } from "path";
dotenv.config();

export const LLMChainExampleHuggingFace = async () => {

  const model = new HuggingFaceInference({
    model: "bigscience/bloom-560m",
    // apiKey: "YOUR-API-KEY", // In Node.js defaults to process.env.HUGGINGFACEHUB_API_KEY
    verbose: true,
  });

  const template = `Question: {question}
  
  Answer: `;

  const prompt = new PromptTemplate({ template, inputVariables: ["question"] });

  const question = 'Which NFL team won the Super Bowl in the 2010 season?';

  // Instantiate LLMChain, which consists of a PromptTemplate and an LLM. Pass
  // the result from the PromptTemplate and the OpenAI LLM model
  const chain = new LLMChain({ llm: model, prompt });

  const res = await chain.call({ question: question });
  console.log({ res });
};
