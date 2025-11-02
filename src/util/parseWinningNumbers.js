export function parseWinningNumbers(input) {
  return input.split(',').map((num) => Number(num.trim()));
}
