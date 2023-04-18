import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

export const openai = new OpenAIApi(configuration);
