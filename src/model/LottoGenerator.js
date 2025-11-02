import LOTTO from '../constants/lotto.js';
import Lotto from './Lotto.js';
import { Random } from '@woowacourse/mission-utils';

class LottoGenerator {
  static generateOneLotto() {
    const numbers = Random.pickUniqueNumbersInRange(
      LOTTO.MIN_NUMBER,
      LOTTO.MAX_NUMBER,
      LOTTO.COUNT,
    );
    return new Lotto(numbers);
  }

  static generateLottos(count) {
    const lottos = Array.from({ length: count }, () => this.generateOneLotto());
    return lottos;
  }
}

export default LottoGenerator;
