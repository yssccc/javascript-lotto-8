import LOTTO from '../constants/lotto.js';
import { ERROR_MESSAGES } from '../constants/messages.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    this.#checkNumberFormat(numbers);
    this.#checkNumberRange(numbers);
    this.#checkNumberCount(numbers);
    this.#checkDuplicates(numbers);
  }

  #checkNumberFormat(numbers) {
    numbers.forEach((num) => {
      if (!/^(0|[1-9]\d*)$/.test(num)) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
      }
    });
  }

  #checkNumberRange(numbers) {
    numbers.forEach((num) => {
      const n = Number(num);
      if (n < LOTTO.MIN_NUMBER || n > LOTTO.MAX_NUMBER) {
        throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
      }
    });
  }

  #checkNumberCount(numbers) {
    if (numbers.length !== LOTTO.COUNT) {
      throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUM_COUNT);
    }
  }

  #checkDuplicates(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR_MESSAGES.DUPLICATED_NUMBER);
    }
  }

  getNumbers() {
    return [...this.#numbers];
  }

  countMatch(winningNumbers) {
    return this.#numbers.filter((num) => winningNumbers.includes(num)).length;
  }

  hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
