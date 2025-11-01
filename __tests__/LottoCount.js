import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import outputView from '../src/view/outputView.js';

describe('로또 결과 count 테스트', () => {
  let app;

  beforeEach(() => {
    app = new App();
  });

  describe('로또 결과 검증', () => {
    test('statsResult 함수 정상 작동', () => {
      const lottoNumbers = [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [1, 2, 3, 40, 41, 42],
        [1, 2, 3, 4, 5, 40],
        [1, 2, 3, 4, 5, 43],
      ];

      const winningNumbersArray = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 40;

      const stats = app.statsResult(
        lottoNumbers,
        winningNumbersArray,
        bonusNumber,
      );

      expect(stats.SIX).toBe(1);
      expect(stats.THREE).toBe(1);
      expect(stats.BONUS).toBe(1);
      expect(stats.FIVE).toBe(1);
      expect(stats.FOUR).toBe(0);

      const logSpy = jest.spyOn(MissionUtils.Console, 'print');

      outputView.printMatchResults(stats);

      expect(logSpy).toHaveBeenCalledWith('3개 일치 (5,000원) - 1개');
      expect(logSpy).toHaveBeenCalledWith('4개 일치 (50,000원) - 0개');
      expect(logSpy).toHaveBeenCalledWith('5개 일치 (1,500,000원) - 1개');
      expect(logSpy).toHaveBeenCalledWith(
        '5개 일치, 보너스 볼 일치 (30,000,000원) - 1개',
      );
      expect(logSpy).toHaveBeenCalledWith('6개 일치 (2,000,000,000원) - 1개');

      logSpy.mockRestore();
    });
  });
});
