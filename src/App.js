import { Console, Random } from '@woowacourse/mission-utils';

class App {
  async getPurchaseAmount() {
    while (true) {
      try {
        const purchaseAmount =
          await Console.readLineAsync('구입금액을 입력해 주세요.\n');
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
        const winningNumbers =
          await Console.readLineAsync('당첨 번호를 입력해 주세요.\n');
        this.winningNumbersValidation(winningNumbers);
        return winningNumbers;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }

  async run() {
    const purchaseAmount = await this.getPurchaseAmount();

    Console.print('\n');

    const purchaseCount = purchaseAmount / 1000;
    Console.print(`${purchaseCount}개를 구매했습니다.`);

    const lottoNumbers = this.generateRandomNumber(purchaseCount);
    lottoNumbers.forEach((numbers) => {
      numbers.sort((a, b) => a - b);
      Console.print(`[${numbers.join(', ')}]`);
    });

    Console.print('\n');

    const winningNumbers = await this.getWinningNumbers();
  }

  purchaseAmountValidation(purchaseAmount) {
    if (purchaseAmount.trim() === '') {
      throw new Error('[ERROR] 입력값이 없습니다.');
    }
    if (!/^[1-9]\d*$/.test(purchaseAmount)) {
      throw new Error('[ERROR] 유효하지 않은 입력입니다.');
    }
    if (purchaseAmount % 1000) {
      throw new Error('[ERROR] 1000단위의 숫자를 입력해주세요.');
    }
  }

  winningNumbersValidation(winningNumbers) {
    if (winningNumbers.trim() === '') {
      throw new Error('[ERROR] 입력값이 없습니다.');
    }

    const nums = winningNumbers.split(',').map((num) => num.trim());

    nums.forEach((num) => {
      if (!/^\d+$/.test(num)) {
        throw new Error('[ERROR] 유효하지 않은 입력값입니다.');
      }
      if (num < 1 || num > 45) {
        throw new Error('[ERROR] 숫자는 1부터 45 사이여야 합니다.');
      }
    });
    if (nums.length !== 6) {
      throw new Error('[ERROR] 숫자는 6개만 입력 가능합니다.');
    }
    const uniqueNums = new Set(nums);
    if (uniqueNums.size !== nums.length) {
      throw new Error('[ERROR] 중복된 숫자가 있습니다.');
    }
  }

  generateRandomNumber(count) {
    const myLottoNumbersArray = [];
    for (let i = 0; i < count; i++) {
      const myLottoNumber = Random.pickUniqueNumbersInRange(1, 45, 6);
      myLottoNumbersArray.push(myLottoNumber);
    }
    return myLottoNumbersArray;
  }
}

export default App;
