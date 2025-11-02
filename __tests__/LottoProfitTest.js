import App from '../src/App.js';
import { Console } from '@woowacourse/mission-utils';
import outputView from '../src/view/outputView.js';
import LottoStats from '../src/model/LottoStats.js';

describe('수익률 계산', () => {
  let app;

  beforeEach(() => {
    app = new App();
  });

  test('수익률을 출력 테스트', () => {
    const stats = {
      THREE: 10,
      FOUR: 5,
      FIVE: 2,
      BONUS: 1,
      SIX: 1,
    };
    const purchaseAmount = 8000;

    const printSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});

    const profitRatio = LottoStats.calculateProfitRatio(stats, purchaseAmount);
    outputView.printProfit(profitRatio);

    const expectedTotalPrize =
      stats.THREE * 5000 +
      stats.FOUR * 50000 +
      stats.FIVE * 1500000 +
      stats.BONUS * 30000000 +
      stats.SIX * 2000000000;

    const expectedProfitRatio =
      Math.round((expectedTotalPrize / purchaseAmount) * 10000) / 100;

    expect(printSpy).toHaveBeenCalledWith(
      `총 수익률은 ${expectedProfitRatio}%입니다.`,
    );

    printSpy.mockRestore();
  });
});
