import { PromptTemplate } from "langchain";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Structured Output Parser
 */

export const StructuredOutputParserExample = async () => {
  // With a `StructuredOutputParser` we can define a schema for the output.
  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    answer: "answer to the user's question",
    source: "source used to answer the user's question, should be a website.",
  });

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: "Answer the users question as best as possible.\n{format_instructions}\n{question}",
    inputVariables: ["question"],
    partialVariables: { format_instructions: formatInstructions },
  });
  
  const model = new OpenAI({ 
    temperature: 0,
    verbose: true,
   });
  
  const input = await prompt.format({
    question: "What is the capital of France?",
  });
  const response = await model.call(input);
  console.info("\n>>>: Structured output example: \n");
  console.log(await parser.parse(response));
  // { answer: 'Paris', source: 'https://en.wikipedia.org/wiki/Paris' }
};

/**
 * Structured Output Parser with Zod Schema
 */
export const StructuredOutputParserWithZodExample = async () => {
  // We can use zod to define a schema for the output using the `fromZodSchema`
  // method of `StructuredOutputParser`.
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      answer: z.string().describe("answer to the user's question"),
      sources: z
      .array(z.string())
      .describe('sources used to answer the question, should be websites.')
    })
  );

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: "Answer the users question as best as possible.\n{format_instructions}\n{question}",
    inputVariables: ["question"],
    partialVariables: { format_instructions: formatInstructions }
  });

  const model = new OpenAI({
    temperature: 0,
    verbose: true
  });

  const input = await prompt.format({ 
    question: "What is the capital of France?",
  });

  const response = await model.call(input);
  console.info("\n>>>: Structured Output Parser with Zod Schema Example: \n");

  console.log(response);
  console.log(await parser.parse(response));
};
