import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();

export const MemoryExample = async () => {

  // Instantiate the BufferMemory passing the memory key for storing state
  const memory = new BufferMemory({ memoryKey: "chat_history" });

  // Instantiante the OpenAI model 
  const model = new OpenAI({ temperature: 0.7 });

  // Note the input variables {chat_history} and {input}
  const template = `The following is a friendly conversation between a human and an AI. \
The AI is talkative and provides lots of specific details from its context. \
If the AI does not know the answer to a question, it truthfully says it does not know. \
Current conversation:
{chat_history}
Human: {input}
AI:`;

  // Instantiate "PromptTemplate" passing the prompt template string initialized above
  const prompt = PromptTemplate.fromTemplate(template);

  // Instantiate LLMChain, which consists of a PromptTemplate, an LLM and memory. 
  const chain = new LLMChain({ llm: model, prompt, memory });

  // Run the chain passing a value for the {input} variable. The result will be
  // stored in {chat_history}

  const msg1 = await chain.call({ input: "Hi! I'm Harry Potter." });
  console.log({ res1: msg1 });

  // Run the chain again passing a value for the {input} variable. This time,
  // the response from the last run ie. the value in {chat_history} will alo be
  // passed as part of the prompt

  const msg2 = await chain.call({ input: "What's my name?" });
  console.log({ res2: msg2 });

  // BONUS!!

  const msg3 = await chain.call({ input: "Which epic movie was I in and who was my protege?" });
  console.log({ res3: msg3 });
};
