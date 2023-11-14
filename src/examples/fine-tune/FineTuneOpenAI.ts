import fs from 'fs';
import OpenAI from 'openai';
import { FineTuningJobEvent } from 'openai/resources/fine-tuning/index.mjs';

import * as dotenv from "dotenv";
dotenv.config();

/**
 * Source: https://github.com/openai/openai-node/blob/master/examples/fine-tuning.ts
 */
async function startFineTune(trainingDataPath : string) {

  const client = new OpenAI();

  console.log(`Uploading file`);

  let file = await client.files.create({
    file: fs.createReadStream(trainingDataPath),
    purpose: 'fine-tune',
  });
  console.log(`Uploaded file with ID: ${file.id}`);

  console.log('-----');

  console.log(`Waiting for file to be processed`);
  while (true) {
    file = await client.files.retrieve(file.id);
    console.log(`File status: ${file.status}`);

    if (file.status === 'processed') {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log('-----');

  console.log(`Starting fine-tuning`);
  let fineTune = await client.fineTuning.jobs.create({ model: process.env.SUN_STYLE_MODEL_NAME as any | 'gpt-3.5-turbo', training_file: file.id });
  console.log(`Fine-tuning ID: ${fineTune.id}`);

  console.log('-----');

  console.log(`Track fine-tuning progress:`);

  const events: Record<string, FineTuningJobEvent> = {};

  while (fineTune.status == 'validating_files' || fineTune.status == 'queued') {
    fineTune = await client.fineTuning.jobs.retrieve(fineTune.id);
    console.log(`${fineTune.status}`);

    const { data } = await client.fineTuning.jobs.listEvents(fineTune.id, { limit: 100 });
    for (const event of data.reverse()) {
      if (event.id in events) continue;
      events[event.id] = event;
      const timestamp = new Date(event.created_at * 1000);
      console.log(`- ${timestamp.toLocaleTimeString()}: ${event.message}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

export const FineTuneOpenAI = async () => {
  startFineTune('./src/fine-tune/training-data/test.jsonl').catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
