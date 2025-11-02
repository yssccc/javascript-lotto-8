import { Random } from '@woowacourse/mission-utils';

import inputView from './view/inputView.js';
import outputView from './view/outputView.js';
import { ERROR_MESSAGES } from './constants/messages.js';
import Lotto from './model/Lotto.js';

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
        const purchaseAmount = await inputView.getPurchaseAmount();

        this.purchaseAmountValidation(purchaseAmount);
        return purchaseAmount;
      } catch (error) {
        outputView.printError(error.message);
      }
    }
  }

  async getWinningNumbers() {
    while (true) {
      try {
        const winningNumbers = await inputView.getWinningNumbers();

        this.winningNumbersValidation(winningNumbers);
        return winningNumbers;
      } catch (error) {
        outputView.printError(error.message);
      }
    }
  }

  async getBonusNumber(winningNumbersArray) {
    while (true) {
      try {
        const bonusNumber = await inputView.getBonusNumber();

        this.bonusNumberValidation(bonusNumber, winningNumbersArray);
        return bonusNumber;
      } catch (error) {
        outputView.printError(error.message);
      }
    }
  }

  async run() {
    const purchaseAmount = await this.getPurchaseAmount();
    const purchaseCount = purchaseAmount / LOTTO_PRICE;
    outputView.printPurchaseSuccess(purchaseCount);

    const lottos = this.generateLottos(purchaseCount);
    outputView.printLottoNumbers(lottos.map((lotto) => lotto.getNumbers()));

    const winningNumbers = await this.getWinningNumbers();

    const winningNumbersArray = winningNumbers
      .split(',')
      .map((num) => Number(num.trim()));

    const bonusNumber = await this.getBonusNumber(winningNumbersArray);

    outputView.printWinningStatistics();

    const stats = this.statsResult(lottos, winningNumbersArray, bonusNumber);
    outputView.printMatchResults(stats);

    const profitRatio = this.calculateProfitRatio(stats, purchaseAmount);
    outputView.printProfit(profitRatio);
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

  generateOneLotto() {
    const numbers = Random.pickUniqueNumbersInRange(
      LOTTO_MIN,
      LOTTO_MAX,
      LOTTO_COUNT,
    );
    return new Lotto(numbers);
  }

  generateLottos(count) {
    const lottos = [];
    for (let i = 0; i < count; i++) {
      lottos.push(this.generateOneLotto());
    }
    return lottos;
  }

  statsResult(lottos, winningNumbersArray, bonusNumber) {
    const stats = {
      THREE: 0,
      FOUR: 0,
      FIVE: 0,
      BONUS: 0,
      SIX: 0,
    };

    lottos.forEach((lotto) => {
      const matchCount = lotto.countMatch(winningNumbersArray);
      const hasBonus = lotto.hasBonus(Number(bonusNumber));

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

  calculateProfitRatio(stats, purchaseAmount) {
    let totalPrize = 0;
    for (const key of Object.keys(stats)) {
      totalPrize += stats[key] * PRIZE_MONEY_VALUE[key];
    }
    return Math.round((totalPrize / purchaseAmount) * 10000) / 100;
  }
}

export default App;
