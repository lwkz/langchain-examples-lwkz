import { HuggingFaceInference } from "langchain/llms/hf";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
import { format } from "path";
dotenv.config();

export const LLMChainExampleHuggingFaceGenerate = async () => {

  const model = new HuggingFaceInference({
    model: "tiiuae/falcon-7b",
    // apiKey: "YOUR-API-KEY", // In Node.js defaults to process.env.HUGGINGFACEHUB_API_KEY
    verbose: true,
  });

  const template = `Answer the following questions one at a time.
Questions: 
{questions}

Answers: 
`;

  const prompt = new PromptTemplate({ template, inputVariables: ["questions"] });

  const questions = `
  Which NFL team won the Super Bowl in the 2010 season?
  If I am 6 ft 4 inches, how tall am I in centimeters?
  Who was the 12th person on the moon?
  How many eyes does a blade of grass have?`;

  // Instantiate LLMChain, which consists of a PromptTemplate and an LLM. Pass
  // the result from the PromptTemplate and the OpenAI LLM model
  const chain = new LLMChain({ llm: model, prompt });

  const res = await chain.call({ questions: questions });
  console.log({ res });
};
