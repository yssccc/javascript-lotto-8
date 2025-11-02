import inputView from '../view/inputView.js';
import outputView from '../view/outputView.js';

import LottoGenerator from '../model/LottoGenerator.js';
import LottoStats from '../model/LottoStats.js';
import LOTTO from '../constants/lotto.js';
import { validatePurchaseAmount } from '../validators/purchaseAmountValidator.js';
import { validateWinningNumbers } from '../validators/winningNumbersValidator.js';
import { validateBonusNumber } from '../validators/bonusNumberValidator.js';
import { parseWinningNumbers } from '../util/parseWinningNumbers.js';

class LottoController {
  async #getValidInput(getterFn, validatorFn, ...args) {
    while (true) {
      try {
        const value = await getterFn();
        validatorFn(value, ...args);
        return value;
      } catch (error) {
        outputView.printError(error.message);
      }
    }
  }

  async getPurchaseAmount() {
    const val = await this.#getValidInput(
      inputView.getPurchaseAmount,
      validatePurchaseAmount,
    );
    return Number(val);
  }

  async getWinningNumbers() {
    return this.#getValidInput(
      inputView.getWinningNumbers,
      validateWinningNumbers,
    );
  }

  async getBonusNumber(winningNumbersArray) {
    const val = await this.#getValidInput(
      inputView.getBonusNumber,
      validateBonusNumber,
      winningNumbersArray,
    );
    return Number(val);
  }

  async #handlePurchase() {
    const purchaseAmount = await this.getPurchaseAmount();
    const purchaseCount = purchaseAmount / LOTTO.PRICE;
    outputView.printPurchaseSuccess(purchaseCount);

    const lottos = LottoGenerator.generateLottos(purchaseCount);
    outputView.printLottoNumbers(lottos.map((lotto) => lotto.getNumbers()));

    return { purchaseAmount, lottos };
  }

  async #handleWinningNumbers() {
    const winningNumbers = await this.getWinningNumbers();
    const winningNumbersArray = parseWinningNumbers(winningNumbers);

    const bonusNumber = await this.getBonusNumber(winningNumbersArray);

    return { winningNumbersArray, bonusNumber };
  }

  #analyzeResults(lottos, winningNumbersArray, bonusNumber, purchaseAmount) {
    const stats = LottoStats.computeStats(
      lottos,
      winningNumbersArray,
      bonusNumber,
    );
    const profitRatio = LottoStats.calculateProfitRatio(stats, purchaseAmount);

    return { stats, profitRatio };
  }

  #printFinalResults(stats, profitRatio) {
    outputView.printWinningStatistics();
    outputView.printMatchResults(stats);
    outputView.printProfit(profitRatio);
  }

  async run() {
    const { purchaseAmount, lottos } = await this.#handlePurchase();
    const { winningNumbersArray, bonusNumber } =
      await this.#handleWinningNumbers();

    const { stats, profitRatio } = this.#analyzeResults(
      lottos,
      winningNumbersArray,
      bonusNumber,
      purchaseAmount,
    );

    this.#printFinalResults(stats, profitRatio);
  }
}

export default LottoController;
