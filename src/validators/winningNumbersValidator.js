import { ERROR_MESSAGES } from '../constants/messages.js';
import { parseWinningNumbers } from '../util/parseWinningNumbers.js';
import { validateLottoNumbers } from './lottoNumbersValidator.js';

export function validateWinningNumbers(input) {
  if (input.trim() === '') {
    throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
  }
  const nums = parseWinningNumbers(input);
  validateLottoNumbers(nums);
  return nums;
}
