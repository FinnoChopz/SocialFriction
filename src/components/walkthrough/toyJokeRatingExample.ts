export interface ToyToken {
  text: string;
  id: number;
  embedding: readonly number[];
}

export const TOY_EMBEDDING_INT_SCALE = 1000;

export function formatToyEmbeddingInt(value: number) {
  return Math.round(value * TOY_EMBEDDING_INT_SCALE);
}

export const TOY_JOKE_RATING_PROMPT =
  'Rate this joke 1-10: "why did the chicken cross the road? To get to the other side."';

export const TOY_JOKE_RATING_TOKENS: ToyToken[] = [
  { text: "Rate", id: 15860, embedding: [0.023, -0.187, 0.941, 0.002, -0.456, 0.112, -0.089, 0.334] },
  { text: " this", id: 428, embedding: [-0.156, 0.234, 0.087, -0.912, 0.445, -0.067, 0.223, -0.189] },
  { text: " joke", id: 8756, embedding: [0.445, -0.023, 0.156, 0.789, -0.234, 0.567, -0.012, 0.89] },
  { text: " 1", id: 352, embedding: [-0.089, 0.445, -0.678, 0.123, 0.89, -0.345, 0.567, 0.012] },
  { text: "-", id: 2013, embedding: [0.234, -0.567, 0.89, -0.123, 0.456, 0.078, -0.901, 0.345] },
  { text: "10", id: 940, embedding: [-0.456, 0.789, 0.012, -0.345, 0.678, -0.901, 0.234, -0.567] },
  { text: ":", id: 25, embedding: [0.112, -0.89, 0.345, 0.678, -0.012, 0.456, -0.789, 0.123] },
  { text: ' "', id: 366, embedding: [-0.234, 0.567, -0.89, 0.123, -0.456, 0.789, 0.012, -0.345] },
  { text: "why", id: 5765, embedding: [0.678, -0.012, 0.345, -0.678, 0.901, -0.234, 0.567, 0.89] },
  { text: " did", id: 863, embedding: [-0.123, 0.456, -0.789, 0.012, -0.345, 0.678, -0.901, 0.234] },
  { text: " the", id: 262, embedding: [0.345, -0.678, 0.901, -0.234, 0.567, -0.89, 0.123, -0.456] },
  { text: " chicken", id: 31918, embedding: [-0.567, 0.89, -0.123, 0.456, -0.789, 0.012, -0.345, 0.678] },
  { text: " cross", id: 14492, embedding: [0.789, -0.012, 0.345, -0.678, 0.901, -0.234, 0.567, -0.89] },
  { text: " the", id: 262, embedding: [0.345, -0.678, 0.901, -0.234, 0.567, -0.89, 0.123, -0.456] },
  { text: " road", id: 10283, embedding: [-0.89, 0.123, -0.456, 0.789, -0.012, 0.345, -0.678, 0.901] },
  { text: "?", id: 30, embedding: [-0.89, 0.123, -0.456, 0.789, -0.012, 0.345, -0.678, 0.901] },
  { text: " To", id: 281, embedding: [0.012, -0.345, 0.678, -0.901, 0.234, -0.567, 0.89, -0.123] },
  { text: " get", id: 1234, embedding: [-0.234, 0.567, -0.89, 0.123, -0.456, 0.789, -0.012, 0.345] },
  { text: " to", id: 281, embedding: [0.012, -0.345, 0.678, -0.901, 0.234, -0.567, 0.89, -0.123] },
  { text: " the", id: 262, embedding: [0.345, -0.678, 0.901, -0.234, 0.567, -0.89, 0.123, -0.456] },
  { text: " other", id: 9876, embedding: [0.456, -0.789, 0.012, -0.345, 0.678, -0.901, 0.234, -0.567] },
  { text: " side", id: 5432, embedding: [0.156, 0.234, 0.087, -0.912, 0.445, -0.067, 0.223, -0.189] },
  { text: '."', id: 777, embedding: [0.456, -0.789, 0.012, -0.345, 0.678, -0.901, 0.234, -0.567] },
];

export const TOY_RESPONSE_TOKENS = [
  {
    text: "7",
    embedding: [0.214, -0.108, 0.332, -0.514, 0.146, 0.082, -0.236, 0.671],
  },
  {
    text: "/",
    embedding: [0.056, -0.412, 0.118, 0.734, -0.209, 0.041, -0.667, 0.182],
  },
  {
    text: "10",
    embedding: TOY_JOKE_RATING_TOKENS.find((t) => t.text === "10")!.embedding,
  },
  {
    text: "STOP",
    embedding: [-0.402, 0.011, 0.622, -0.144, -0.088, 0.903, -0.317, 0.057],
  },
] as const;
