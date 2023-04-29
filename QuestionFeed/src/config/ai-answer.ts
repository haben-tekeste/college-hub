import NLPCloudClient from "nlpcloud";

if (!process.env.NLP_KEY) throw new Error("NLP KEY must be defined");

const client = new NLPCloudClient(
  "finetuned-gpt-neox-20b",
  process.env.NLP_KEY,
  true,
  "en"
);

export { client };
