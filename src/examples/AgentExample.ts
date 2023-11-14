import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutor } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";

import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();

export const AgentExample = async () => {

  // Instantiate the OpenAI model 
  const model = new OpenAI({ temperature: 0.7 });

  // Create a list of the instatiated tools
  const tools = [new SerpAPI(), new Calculator()];

  // Construct an agent from an LLM and a list of tools

  // "zero-shot-react-description" tells the agent to use the ReAct framework to
  // determine which tool to use.

  // The ReAct framework determines which tool to use based solely on the tool’s
  // description. Any number of tools can be provided. This agent requires that
  // a description is provided for each tool.

  const executor = await initializeAgentExecutor(
    tools,
    model,
    "zero-shot-react-description"
  );

  // Specify the prompt
  const input = "Who is Beyonce's husband?" +
    " What is his current age raised to the 0.23 power?";

  // Run the agent
  const result = await executor.call({ input });
  console.log(`Output: ${result.output}`);
};
