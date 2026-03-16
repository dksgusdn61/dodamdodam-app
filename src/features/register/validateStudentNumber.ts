export const validateStudentNumber = (text: string): string => {
  const digits = text.replace(/[^0-9]/g, "");
  let result = "";

  for (let i = 0; i < digits.length && i < 4; i++) {
    const d = digits[i];
    if (i === 0 && (d < "1" || d > "3")) break;
    if (i === 1 && (d < "1" || d > "4")) break;
    if (i === 2 && d > "3") break;
    if (i === 3) {
      const num = Number(digits[2] + d);
      if (num < 1 || num > 30) break;
    }
    result += d;
  }

  return result;
};
