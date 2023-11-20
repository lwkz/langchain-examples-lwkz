import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

// Load environment variables (populate process.env from .env file)

import * as dotenv from "dotenv";
dotenv.config();

export const VisionExample = async () => {

  const chat = new ChatOpenAI({
    modelName: 'gpt-4-vision-preview'
  });

  const humanMsg = new HumanMessage(
    { content: [
      { type: "text", text: "What is in this image?" },
      {
        type: "image_url",
        image_url: {
          "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
        },
      },
    ]}
  );
  const response = await chat.call([humanMsg]);

  console.log(response);
}
