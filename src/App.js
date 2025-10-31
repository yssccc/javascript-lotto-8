import { Console, Random } from '@woowacourse/mission-utils';
import { ERROR_MESSAGES, IO } from './messages.js';

const LOTTO_PRICE = 1000;
const LOTTO_COUNT = 6;
const LOTTO_MIN = 1;
const LOTTO_MAX = 45;

class App {
  async getPurchaseAmount() {
    while (true) {
      try {
        const purchaseAmount = await Console.readLineAsync(IO.PURCHASE_PROMPT);

        this.purchaseAmountValidation(purchaseAmount);
        return purchaseAmount;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async getWinningNumbers() {
    while (true) {
      try {
        const winningNumbers = await Console.readLineAsync(
          IO.WINNING_NUMBERS_PROMPT,
        );

        this.winningNumbersValidation(winningNumbers);
        return winningNumbers;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async getBonusNumber(winningNumbersArray) {
    while (true) {
      try {
        const bonusNumber = await Console.readLineAsync(IO.BONUS_NUMBER_PROMPT);

        this.bonusNumberValidation(bonusNumber, winningNumbersArray);
        return bonusNumber;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async run() {
    const purchaseAmount = await this.getPurchaseAmount();

    Console.print('\n');

    const purchaseCount = purchaseAmount / LOTTO_PRICE;
    Console.print(IO.PURCHASE_SUCCESS(purchaseCount));

    const lottoNumbers = this.generateRandomNumbers(purchaseCount);
    lottoNumbers.forEach((numbers) => {
      numbers.sort((a, b) => a - b);
      Console.print(`[${numbers.join(', ')}]`);
    });

    Console.print('\n');

    const winningNumbers = await this.getWinningNumbers();

    const winningNumbersArray = winningNumbers
      .split(',')
      .map((num) => num.trim());

    const bonusNumber = await this.getBonusNumber(winningNumbersArray);
  }

  purchaseAmountValidation(purchaseAmount) {
    if (purchaseAmount.trim() === '') {
      throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
    }
    if (!/^[1-9]\d*$/.test(purchaseAmount)) {
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
    if (purchaseAmount % LOTTO_PRICE) {
      throw new Error(ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT);
    }
  }

  winningNumbersValidation(winningNumbers) {
    if (winningNumbers.trim() === '') {
      throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
    }

    const nums = winningNumbers.split(',').map((num) => num.trim());

    nums.forEach((num) => {
      if (!/^(0|[1-9]\d*)$/.test(num)) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
      }
      if (Number(num) < 1 || Number(num) > 45) {
        throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
      }
    });
    if (nums.length !== LOTTO_COUNT) {
      throw new Error(ERROR_MESSAGES.INVALID_WINNING_NUM_COUNT);
    }
    const uniqueNums = new Set(nums);
    if (uniqueNums.size !== nums.length) {
      throw new Error(ERROR_MESSAGES.DUPLICATED_NUMBER);
    }
  }

  bonusNumberValidation(bonusNumber, winningNumbersArray) {
    if (bonusNumber.trim() === '') {
      throw new Error(ERROR_MESSAGES.EMPTY_INPUT);
    }

    if (!/^(0|[1-9]\d*)$/.test(bonusNumber)) {
      throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }

    const bonusNum = Number(bonusNumber);

    if (bonusNum < 1 || bonusNum > 45) {
      throw new Error(ERROR_MESSAGES.OUT_OF_RANGE);
    }

    if (winningNumbersArray.includes(bonusNum)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_DUPLICATE);
    }
  }

  generateRandomNumbers(count) {
    const myLottoNumbersArray = [];
    for (let i = 0; i < count; i++) {
      const myLottoNumber = Random.pickUniqueNumbersInRange(
        LOTTO_MIN,
        LOTTO_MAX,
        LOTTO_COUNT,
      );
      myLottoNumbersArray.push(myLottoNumber);
    }
    return myLottoNumbersArray;
  }
}

export default App;
