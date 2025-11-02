import { ERROR_MESSAGES } from '../constants/messages.js';

export function validatePurchaseAmount(purchaseAmount) {
  if (purchaseAmount.trim() === '') {
    throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
  }
  if (!/^[1-9]\d*$/.test(purchaseAmount)) {
    throw new Error(ERROR_MESSAGES.INVALID_INPUT);
  }
  if (purchaseAmount % 1000 !== 0) {
    throw new Error(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT);
  }
}
