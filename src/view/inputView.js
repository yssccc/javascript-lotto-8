import { Console } from '@woowacourse/mission-utils';
import { IO_MESSAGES } from '../constants/messages.js';

const inputView = {
  async getPurchaseAmount() {
    const input = await Console.readLineAsync(IO_MESSAGES.PURCHASE_PROMPT);
    return input;
  },

  async getWinningNumbers() {
    const input = await Console.readLineAsync(
      IO_MESSAGES.WINNING_NUMBERS_PROMPT,
    );
    return input;
  },

  async getBonusNumber() {
    const input = await Console.readLineAsync(IO_MESSAGES.BONUS_NUMBER_PROMPT);
    return input;
  },
};
export default inputView;
