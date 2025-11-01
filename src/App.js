import { Console, Random } from '@woowacourse/mission-utils';
import { ERROR_MESSAGES, IO_MESSAGES } from './messages.js';

const LOTTO_PRICE = 1000;
const LOTTO_COUNT = 6;
const LOTTO_MIN = 1;
const LOTTO_MAX = 45;

const STATS_MAPPING = {
  3: 'THREE',
  4: 'FOUR',
  5: 'FIVE',
  6: 'SIX',
};

const PRIZE_MONEY = {
  THREE: '5,000원',
  FOUR: '50,000원',
  FIVE: '1,500,000원',
  BONUS: '30,000,000원',
  SIX: '2,000,000,000원',
};

const PRIZE_MONEY_VALUE = {
  THREE: 5000,
  FOUR: 50000,
  FIVE: 1500000,
  BONUS: 30000000,
  SIX: 2000000000,
};

class App {
  async getPurchaseAmount() {
    while (true) {
      try {
        const purchaseAmount = await Console.readLineAsync(
          IO_MESSAGES.PURCHASE_PROMPT,
        );

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
          IO_MESSAGES.WINNING_NUMBERS_PROMPT,
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
        const bonusNumber = await Console.readLineAsync(
          IO_MESSAGES.BONUS_NUMBER_PROMPT,
        );

        this.bonusNumberValidation(bonusNumber, winningNumbersArray);
        return bonusNumber;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async run() {
    const purchaseAmount = await this.getPurchaseAmount();

    const purchaseCount = purchaseAmount / LOTTO_PRICE;
    Console.print(IO_MESSAGES.PURCHASE_SUCCESS(purchaseCount));

    const lottoNumbers = this.generateRandomNumbers(purchaseCount);
    lottoNumbers.forEach((numbers) => {
      numbers.sort((a, b) => a - b);
      Console.print(`[${numbers.join(', ')}]`);
    });

    const winningNumbers = await this.getWinningNumbers();

    const winningNumbersArray = winningNumbers
      .split(',')
      .map((num) => Number(num.trim()));

    const bonusNumber = await this.getBonusNumber(winningNumbersArray);

    Console.print(IO_MESSAGES.WINNING_STATISTICS);
    Console.print(IO_MESSAGES.DIVIDER);

    const stats = this.statsResult(
      lottoNumbers,
      winningNumbersArray,
      bonusNumber,
    );
    this.printResults(stats);
    this.printProfitResults(stats, purchaseAmount);
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

  statsResult(lottoNumbers, winningNumbersArray, bonusNumber) {
    const stats = {
      THREE: 0,
      FOUR: 0,
      FIVE: 0,
      BONUS: 0,
      SIX: 0,
    };

    lottoNumbers.forEach((lotto) => {
      const matchCount = lotto.filter((num) =>
        winningNumbersArray.includes(num),
      ).length;
      const hasBonus = lotto.includes(Number(bonusNumber));

      if (matchCount === 6) {
        stats.SIX += 1;
      } else if (matchCount === 5 && hasBonus) {
        stats.BONUS += 1;
      } else if (matchCount >= 3 && matchCount <= 5) {
        stats[STATS_MAPPING[matchCount]] += 1;
      }
    });

    return stats;
  }

  printResults(stats) {
    const messages = [
      `3개 일치 (${PRIZE_MONEY.THREE}) - ${stats.THREE}개`,
      `4개 일치 (${PRIZE_MONEY.FOUR}) - ${stats.FOUR}개`,
      `5개 일치 (${PRIZE_MONEY.FIVE}) - ${stats.FIVE}개`,
      `5개 일치, 보너스 볼 일치 (${PRIZE_MONEY.BONUS}) - ${stats.BONUS}개`,
      `6개 일치 (${PRIZE_MONEY.SIX}) - ${stats.SIX}개`,
    ];

    messages.forEach((msg) => Console.print(msg));
  }

  printProfitResults(stats, purchaseAmount) {
    let totalPrize = 0;
    for (const key of Object.keys(stats)) {
      totalPrize += stats[key] * PRIZE_MONEY_VALUE[key];
    }

    const profitRatio = Math.round((totalPrize / purchaseAmount) * 10000) / 100;

    Console.print(`총 수익률은 ${profitRatio}%입니다.`);
  }
}

export default App;
