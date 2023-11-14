import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  HumanMessage,
  SystemMessage,
} from "langchain/schema";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();

export const ChatModelExample = async () => {
  const chat = new ChatOpenAI({
    maxConcurrency: 5,
    maxRetries: 3,
  });

  // Pass in a list of messages to `call` to start a converation. 
  // In this simple example, we only pass in one example.

  // const response = await chat.call([
  //   new HumanMessage("What is a good name for a company that makes colourful socks?"),
  // ]);

  // console.log(response);

  // Similar to LLMs, you can also use `generate` to 
  // generate chat completions for multiple sets of messages.

  const responseGenerates = await chat.generate([
    [
      new SystemMessage(
        "You are a helpful assistant that translates English to French."
      ),
      new HumanMessage(
        "Translate this sentence from English to French. I love programming."
      ),
    ],
    [
      new SystemMessage(
        "You are a helpful assistant that translates English to French."
      ),
      new HumanMessage(
        "Translate this sentence from English to French. I love artificial intelligence."
      ),
    ],
  ]);
  console.log(responseGenerates.generations);
}