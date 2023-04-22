import * as toxicity from "@tensorflow-models/toxicity";

// The minimum prediction confidence.
const threshold = 0.9;
const toxicityLabel = [
  "identity_attack",
  "insult",
  "obscene",
  "severe_toxicity",
  "sexual_explicit",
  "threat",
  "toxicity",
];

// Load the model. Users optionally pass in a threshold and an array of
// labels to include.
// `predictions` is an array of objects, one for each prediction head,
// that contains the raw probabilities for each input along with the
// final prediction in `match` (either `true` or `false`).
// If neither prediction exceeds the threshold, `match` is `null`.
export const classifyComment = async (content: string) => {
  let status = "Approved";
  const model = await toxicity.load(threshold, toxicityLabel);
  const predictions = await model.classify(content);

  predictions.forEach((prediction) => {
    if (prediction.results[0].match) {
      status = "Rejected";
      return;
    }
  });
  return status;
};
