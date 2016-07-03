const noun = (num = 0, words = ['рубль', 'рубля', 'рублей']) => {
  const number = Math.abs(num) % 100;
  const numberDecimal = number % 10;

  if (number > 10 && number < 20) return words[2];
  if (numberDecimal > 1 && numberDecimal < 5) return words[1];
  if (numberDecimal === 1) return words[0];
  return words[2];
};

export default noun;
