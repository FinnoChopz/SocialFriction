export const TOY_MODEL_WEIGHTS = generateToyModelWeights({
  rows: 32,
  cols: 32,
  seed: 1337,
});

export function formatWeightMatrix(matrix: number[][], fractionDigits = 2) {
  const cellWidth = fractionDigits + 3;
  return matrix
    .map((row) => row.map((value) => value.toFixed(fractionDigits).padStart(cellWidth)).join(" "))
    .join("\n");
}

function generateToyModelWeights({
  rows,
  cols,
  seed,
}: {
  rows: number;
  cols: number;
  seed: number;
}) {
  const random = mulberry32(seed);
  const weights: number[][] = [];

  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    for (let c = 0; c < cols; c++) {
      const value = gaussianRandom(random) * 0.35;
      row.push(clamp(value, -0.99, 0.99));
    }
    weights.push(row);
  }

  return weights;
}

function gaussianRandom(random: () => number) {
  const u = Math.max(random(), 1e-12);
  const v = random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
