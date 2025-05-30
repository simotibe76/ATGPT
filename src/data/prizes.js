const prizeValues = [
  0, 5000, 1, 10000, 5, 15000, 10, 20000, 20, 30000,
  50, 50000, 75, 75000, 100, 100000, 200, 200000, 500, 300000
];

// Aggiungi questo named export
export const prizes = prizeValues;

export const getShuffledPrizes = () => {
  const shuffled = [...prizeValues].sort(() => Math.random() - 0.5);
  return shuffled.map((value, index) => ({ id: index + 1, value }));
};

export default prizeValues;

