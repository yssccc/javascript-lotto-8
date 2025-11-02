import { ERROR_MESSAGES } from '../src/constants/messages.js';
import { validateBonusNumber } from '../src/validators/bonusNumberValidator.js';
import { validatePurchaseAmount } from '../src/validators/purchaseAmountValidator.js';
import { validateWinningNumbers } from '../src/validators/winningNumbersValidator.js';

describe('Validation 테스트', () => {
  describe('구입 금액 검증', () => {
    test('빈 문자열 입력', () => {
      expect(() => validatePurchaseAmount('')).toThrow(
        ERROR_MESSAGES.EMPTY_INPUT,
      );
    });
    test('숫자가 아닌 입력', () => {
      expect(() => validatePurchaseAmount('1000a')).toThrow(
        ERROR_MESSAGES.INVALID_INPUT,
      );
    });
    test('1000으로 나누어 떨어지지 않는 금액 입력', () => {
      expect(() => validatePurchaseAmount('1500')).toThrow(
        ERROR_MESSAGES.INVALID_PURCHASE_AMOUNT,
      );
    });
    test('정상 입력', () => {
      expect(() => validatePurchaseAmount('3000')).not.toThrow();
    });
  });

  describe('당첨 번호 검증', () => {
    test('빈 입력', () => {
      expect(() => validateWinningNumbers('')).toThrow(
        ERROR_MESSAGES.EMPTY_INPUT,
      );
    });

    test('숫자가 아닌 입력 포함', () => {
      expect(() => validateWinningNumbers('1, 2, 3, 4, a, 6')).toThrow(
        ERROR_MESSAGES.INVALID_INPUT,
      );
      expect(() => validateWinningNumbers('1,,2')).toThrow(
        ERROR_MESSAGES.INVALID_INPUT,
      );
      expect(() => validateWinningNumbers('01, 2, 3, 4, 5, 6')).toThrow(
        ERROR_MESSAGES.INVALID_INPUT,
      );
    });

    test('1~45 범위를 벗어나는 숫자 포함', () => {
      expect(() => validateWinningNumbers('1, 2, 3, 4, 5, 46')).toThrow(
        ERROR_MESSAGES.OUT_OF_RANGE,
      );
      expect(() => validateWinningNumbers('0, 2, 3, 4, 5, 6')).toThrow(
        ERROR_MESSAGES.OUT_OF_RANGE,
      );
    });

    test('숫자가 6개보다 적을 경우 예외 발생', () => {
      expect(() => validateWinningNumbers('1, 2, 3, 4, 5')).toThrow(
        ERROR_MESSAGES.INVALID_WINNING_NUM_COUNT,
      );
    });

    test('중복 숫자 포함', () => {
      expect(() => validateWinningNumbers('1, 2, 3, 4, 4, 5')).toThrow(
        ERROR_MESSAGES.DUPLICATED_NUMBER,
      );
    });

    test('정상 입력', () => {
      expect(() => validateWinningNumbers('1, 2, 3, 4, 5, 6')).not.toThrow();
    });
  });

  describe('보너스 번호 검증', () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    test('빈 입력', () => {
      expect(() => validateBonusNumber('', winningNumbers)).toThrow(
        ERROR_MESSAGES.EMPTY_INPUT,
      );
    });

    test('숫자가 아닌 입력', () => {
      expect(() => validateBonusNumber('a', winningNumbers)).toThrow(
        ERROR_MESSAGES.INVALID_INPUT,
      );
      expect(() => validateBonusNumber('01', winningNumbers)).toThrow(
        ERROR_MESSAGES.INVALID_INPUT,
      );
    });

    test('1~45 범위를 벗어나는 숫자', () => {
      expect(() => validateBonusNumber('46', winningNumbers)).toThrow(
        ERROR_MESSAGES.OUT_OF_RANGE,
      );
      expect(() => validateBonusNumber('0', winningNumbers)).toThrow(
        ERROR_MESSAGES.OUT_OF_RANGE,
      );
    });

    test('보너스 번호가 당첨 번호와 중복', () => {
      expect(() => validateBonusNumber('3', winningNumbers)).toThrow(
        ERROR_MESSAGES.BONUS_NUMBER_DUPLICATE,
      );
    });

    test('정상 입력', () => {
      expect(() => validateBonusNumber('10', winningNumbers)).not.toThrow();
    });
  });
});
