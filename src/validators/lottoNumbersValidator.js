import LOTTO from '../constants/lotto.js';
import { ERROR_MESSAGES } from '../constants/messages.js';

export function validateLottoNumbers(numbers) {
  checkNumberFormat(numbers);
  checkNumberRange(numbers);
  checkNumberCount(numbers);
  checkDuplicates(numbers);
}

function checkNumberFormat(numbers) {
  numbers.forEach((num) => {
    if (!/^(0|[1-9]\d*)$/.test(String(num))) {
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
  });
}

function checkNumberRange(numbers) {
  numbers.forEach((num) => {
    const n = Number(num);
    if (n < LOTTO.MIN_NUMBER || n > LOTTO.MAX_NUMBER) {
      throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
    }
  });
}

function checkNumberCount(numbers) {
  if (numbers.length !== LOTTO.COUNT) {
    throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUM_COUNT);
  }
}

function checkDuplicates(numbers) {
  if (new Set(numbers).size !== numbers.length) {
    throw new Error(ERROR_MESSAGES.DUPLICATED_NUMBER);
  }
}
