import LOTTO from '../constants/lotto.js';
import { ERROR_MESSAGES } from '../constants/messages.js';

export function validateBonusNumber(bonusNumber, winningNumbersArray) {
  if (bonusNumber.trim() === '') {
    throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
  }
  if (!/^(0|[1-9]\d*)$/.test(bonusNumber)) {
    throw new Error(ERROR_MESSAGES.INVALID_INPUT);
  }
  const bonusNum = Number(bonusNumber);
  if (bonusNum < LOTTO.MIN_NUMBER || bonusNum > LOTTO.MAX_NUMBER) {
    throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
  }
  if (winningNumbersArray.includes(bonusNum)) {
    throw new Error(ERROR_MESSAGES.BONUS_NUMBER_DUPLICATE);
  }
}
