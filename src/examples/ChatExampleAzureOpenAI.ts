import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  HumanMessage,
  SystemMessage,
} from "langchain/schema";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();

export const ChatExampleAzureOpenAI = async () => {

  // Instantiate the OpenAI model 
  const chat = new ChatOpenAI({
    temperature: 0.7,
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
    verbose: true,
  });
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
        "Translate this sentence from English to French. I love Artificial Intelligence (AI)."
      ),
    ],
  ]);
  console.log(responseGenerates.generations);
};
