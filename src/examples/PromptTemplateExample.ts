import {
  PromptTemplate,
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate
} from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();

export const PromptTemplateExample = async () => {
  // A `PromptTemplate` consists of a template string and a list of input variables.
  const template = "What is a good name for a company that produces {product}?";
  const promptA = new PromptTemplate({ template, inputVariables: ["product"] });

  // We can use the `format` method to format the template with the given input values.
  const responseA = await promptA.format({ product: "newspapers" });
  console.log({ responseA });

  // We can also use the `fromTemplate` method to create a `PromptTemplate` object.
  const promptB = PromptTemplate.fromTemplate(
    "What is a good name for a company that prints {product}?"
  );
  const responseB = await promptB.format({ product: "magazines" });
  console.log({ responseB });

  // For chat models, we provide a `ChatPromptTemplate` class that can be used to format chat prompts.
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "You are a helpful assistant that translates {input_language} to {output_language}."
    ),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
  ]);

  // The result can be formatted as a string using the `format` method.
  const responseC = await chatPrompt.format({
    input_language: "English",
    output_language: "French",
    text: "I love programming.",
  });
  console.log({ responseC });

  // The result can also be formatted as a list of `ChatMessage` objects by returning a `PromptValue` object and calling the `toChatMessages` method.
  // More on this below.
  const responseD = await chatPrompt.formatPromptValue({
    input_language: "English",
    output_language: "French",
    text: "I love programming.",
  });
  const messages = responseD.toChatMessages();
  console.log({ messages });

  // Instantiate the OpenAI model 
  const model = new OpenAI({ temperature: 0.7 });
  const res = await model.call(responseA);
  console.log({ res: res });
};
