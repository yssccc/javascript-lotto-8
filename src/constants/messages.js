const IO_MESSAGES = Object.freeze({
  PURCHASE_PROMPT: '구입금액을 입력해 주세요.\n',
  WINNING_NUMBERS_PROMPT: '\n당첨 번호를 입력해 주세요.\n',
  BONUS_NUMBER_PROMPT: '\n보너스 번호를 입력해 주세요.\n',
  PURCHASE_SUCCESS: (count) => `\n${count}개를 구매했습니다.`,
  WINNING_STATISTICS: '\n당첨 통계',
  DIVIDER: '---',
});

const ERROR_PREFIX = `[ERROR]`;

const ERROR_MESSAGES = Object.freeze({
  EMPTY_INPUT: `${ERROR_PREFIX} 입력값이 없습니다.`,
  INVALID_INPUT: `${ERROR_PREFIX} 유효하지 않은 입력값입니다.`,
  INVALID_PURCHASE_AMOUNT: `${ERROR_PREFIX} 1000단위의 숫자를 입력해주세요.`,
  INVALID_WINNING_NUM_COUNT: `${ERROR_PREFIX} 숫자는 6개만 입력 가능합니다.`,
  DUPLICATED_NUMBER: `${ERROR_PREFIX} 중복된 숫자가 있습니다.`,
  OUT_OF_RANGE: `${ERROR_PREFIX} 숫자는 1부터 45 사이여야 합니다.`,
  BONUS_NUMBER_DUPLICATE: `${ERROR_PREFIX} 보너스 번호가 당첨 번호와 중복됩니다.`,
});

const PRIZE_MONEY = Object.freeze({
  THREE: '5,000원',
  FOUR: '50,000원',
  FIVE: '1,500,000원',
  BONUS: '30,000,000원',
  SIX: '2,000,000,000원',
});

export { IO_MESSAGES, ERROR_MESSAGES, PRIZE_MONEY };
