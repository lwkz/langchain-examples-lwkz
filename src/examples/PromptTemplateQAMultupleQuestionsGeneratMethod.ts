import { PromptTemplate } from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();

export const PromptTemplateQAMultupleQuestionsGeneratMethod = async () => {
  // Instantiate the OpenAI model 
  const model = new OpenAI({
    temperature: 0.0,
    verbose: true
  });
  
  const template = "Question {question}\n\nAnswer:";
  const promptTemplate = new PromptTemplate({ template, inputVariables: ["question"] });
  const questions = ["Which NFL team won the Super Bowl in the 2010 season?",
                     "If I am 6 ft 4 inches, how tall am I in centimeters?",
                     "Who was the 12th person on the moon?",
                     "How many eyes does a blade of grass have?"];

  /*
  const prompt = await promptTemplate.format({
    question: "Which NFL team won the Super Bowl in the 2010 season?"
  });
  */

  //const res = await model.call(prompt);
  const res = await model.generate(questions);
  console.log(JSON.stringify(res, null, 4));
};
