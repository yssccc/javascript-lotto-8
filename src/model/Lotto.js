import { ERROR_MESSAGES } from '../constants/messages.js';

const LOTTO_COUNT = 6;
const LOTTO_MIN = 1;
const LOTTO_MAX = 45;

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (!Array.isArray(numbers)) {
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }

    if (numbers.length !== LOTTO_COUNT) {
      throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUM_COUNT);
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== LOTTO_COUNT) {
      throw new Error(ERROR_MESSAGES.DUPLICATED_NUMBER);
    }

    numbers.forEach((num) => {
      if (num < LOTTO_MIN || num > LOTTO_MAX) {
        throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
      }
    });
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
