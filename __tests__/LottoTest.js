import { ERROR_MESSAGES } from '../src/constants/messages.js';
import Lotto from '../src/model/Lotto.js';

describe('로또 클래스 테스트', () => {
  test('로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(ERROR_MESSAGES.INVALID_WINNING_NUM_COUNT);
  });

  test('로또 번호 개수가 6개 미만일 때 예외 발생', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5]);
    }).toThrow(ERROR_MESSAGES.INVALID_WINNING_NUM_COUNT);
  });

  test('번호 배열이 빈 배열일 때 예외 발생', () => {
    expect(() => {
      new Lotto([]);
    }).toThrow(ERROR_MESSAGES.INVALID_WINNING_NUM_COUNT);
  });

  test('로또 번호에 중복된 숫자가 있으면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(ERROR_MESSAGES.DUPLICATED_NUMBER);
  });

  test('번호가 범위를 벗어나면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([0, 2, 3, 4, 5, 6]);
    }).toThrow(ERROR_MESSAGES.OUT_OF_RANGE);

    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 46]);
    }).toThrow(ERROR_MESSAGES.OUT_OF_RANGE);
  });

  test('로또 번호에 올바른 숫자가 아닌 게 들어오면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 'a']);
    }).toThrow(ERROR_MESSAGES.INVALID_INPUT);
  });

  test('로또 번호에 올바른 숫자가 아닌 게 들어오면 예외가 발생한다.', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, '06']);
    }).toThrow(ERROR_MESSAGES.INVALID_INPUT);
  });

  test('countMatch와 hasBonus 메서드가 정상 작동한다.', () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
    expect(lotto.countMatch([1, 2, 10])).toBe(2);
    expect(lotto.hasBonus(6)).toBe(true);
    expect(lotto.hasBonus(7)).toBe(false);
  });
});
