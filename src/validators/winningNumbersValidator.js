import LOTTO from '../constants/lotto.js';
import { ERROR_MESSAGES } from '../constants/messages.js';

export function validateWinningNumbers(winningNumbers) {
  if (winningNumbers.trim() === '') {
    throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
  }
  const nums = winningNumbers.split(',').map((num) => num.trim());

  nums.forEach((num) => {
    if (!/^(0|[1-9]\d*)$/.test(num)) {
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
    const n = Number(num);
    if (n < LOTTO.MIN_NUMBER || n > LOTTO.MAX_NUMBER) {
      throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
    }
  });

  if (nums.length !== LOTTO.COUNT) {
    throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUM_COUNT);
  }

  if (new Set(nums).size !== nums.length) {
    throw new Error(ERROR_MESSAGES.DUPLICATED_NUMBER);
  }
}
