import { 
  PromptTemplate, 
  PipelinePromptTemplate 
} from "langchain/prompts";

// Load environment variables (populate process.env from .env file)
import * as dotenv from "dotenv";
dotenv.config();

export const PromptTemplateCompositionExample = async () => {
  const fullPrompt = PromptTemplate.fromTemplate(`{introduction}

  {example}

  {start}`);

  const introductionPrompt = PromptTemplate.fromTemplate(
    `You are impersonating {person}.`
  );

  const examplePrompt = PromptTemplate.fromTemplate(`Here is an example of an interaction:
  Q: {example_q}
  A: {example_a}`);

  const startPrompt = PromptTemplate.fromTemplate(`Now, do this for real!
  Q: {input}
  A: `);

  const composedPrompt = new PipelinePromptTemplate({
    pipelinePrompts: [
      {
        name: "introduction",
        prompt: introductionPrompt,
      },
      {
        name: "example",
        prompt: examplePrompt,
      },
      {
        name: "start",
        prompt: startPrompt,
      }
    ],
    finalPrompt: fullPrompt
  });

  const formattedPrompt = await composedPrompt.format({
    person: "Elon Musk",
    example_q: "What's your favourite car?",
    example_a: "Telsa",
    input: "What is your favourite social media site?"
  });

  console.log(formattedPrompt);
};
