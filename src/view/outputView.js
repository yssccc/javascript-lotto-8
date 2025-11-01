import { Console } from '@woowacourse/mission-utils';
import { IO_MESSAGES, PRIZE_MONEY } from '../constants/messages.js';

const outputView = {
  printPurchaseSuccess(purchaseCount) {
    Console.print(IO_MESSAGES.PURCHASE_SUCCESS(purchaseCount));
  },

  printLottoNumbers(lottoNumbers) {
    lottoNumbers.forEach((numbers) => {
      numbers.sort((a, b) => a - b);
      Console.print(`[${numbers.join(', ')}]`);
    });
  },

  printWinningStatistics() {
    Console.print(IO_MESSAGES.WINNING_STATISTICS);
    Console.print(IO_MESSAGES.DIVIDER);
  },

  printMatchResults(stats) {
    Console.print(`3개 일치 (${PRIZE_MONEY.THREE}) - ${stats.THREE}개`);
    Console.print(`4개 일치 (${PRIZE_MONEY.FOUR}) - ${stats.FOUR}개`);
    Console.print(`5개 일치 (${PRIZE_MONEY.FIVE}) - ${stats.FIVE}개`);
    Console.print(
      `5개 일치, 보너스 볼 일치 (${PRIZE_MONEY.BONUS}) - ${stats.BONUS}개`,
    );
    Console.print(`6개 일치 (${PRIZE_MONEY.SIX}) - ${stats.SIX}개`);
  },

  printProfit(profitRatio) {
    Console.print(`총 수익률은 ${profitRatio}%입니다.`);
  },

  printError(message) {
    Console.print(message);
  },
};

export default outputView;
