import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();

export const PromptTemplateQuestionAnswer = async () => {
  // Instantiate the OpenAI model 
  const model = new OpenAI({
    temperature: 0.7,
    modelName: "text-davinci-003",
    verbose: true
  });
  
  const template = "Question {question}\n\nAnswer:";
  const promptTemplate = new PromptTemplate({ template, inputVariables: ["question"] });
  const prompt = await promptTemplate.format({
    question: "Which NFL team won the Super Bowl in the 2010 season?"
  });

  const res = await model.call(prompt);
  console.log(JSON.stringify(res, null, 4));
};
