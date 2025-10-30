import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    while (true) {
      try {
        const purchaseAmount =
          await Console.readLineAsync('구입금액을 입력해 주세요.\n');
        this.purchaseAmountValidation(purchaseAmount);
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  purchaseAmountValidation(purchaseAmount) {
    if (purchaseAmount === '') {
      throw new Error('[ERROR] 입력값이 없습니다.');
    }
    if (!/^[1-9]\d*$/.test(purchaseAmount)) {
      throw new Error('[ERROR] 유효하지 않은 입력입니다.');
    }
    if (purchaseAmount % 1000) {
      throw new Error('[ERROR] 1000단위의 숫자를 입력해주세요.');
    }
  }
}

export default App;
