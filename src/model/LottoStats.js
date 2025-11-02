const STATS_MAPPING = {
  3: 'THREE',
  4: 'FOUR',
  5: 'FIVE',
  6: 'SIX',
};

const PRIZE_MONEY_VALUE = {
  THREE: 5000,
  FOUR: 50000,
  FIVE: 1500000,
  BONUS: 30000000,
  SIX: 2000000000,
};

class LottoStats {
  static computeStats(lottos, winningNumbers, bonusNumber) {
    const stats = this.#initializeStats();

    lottos.forEach((lotto) => {
      const matchCount = lotto.countMatch(winningNumbers);
      const hasBonus = lotto.hasBonus(bonusNumber);

      this.#updateStats(stats, matchCount, hasBonus);
    });

    return stats;
  }

  static #initializeStats() {
    return {
      THREE: 0,
      FOUR: 0,
      FIVE: 0,
      BONUS: 0,
      SIX: 0,
    };
  }

  static #updateStats(stats, matchCount, hasBonus) {
    if (matchCount === 6) stats.SIX++;
    else if (matchCount === 5 && hasBonus) stats.BONUS++;
    else if (matchCount >= 3 && matchCount <= 5)
      stats[STATS_MAPPING[matchCount]] += 1;
  }

  static calculateTotalPrize(stats) {
    let totalPrize = 0;
    for (const key in stats) {
      totalPrize += stats[key] * PRIZE_MONEY_VALUE[key];
    }
    return totalPrize;
  }

  static calculateProfitRatio(stats, purchaseAmount) {
    const totalPrize = this.calculateTotalPrize(stats);
    return Math.round((totalPrize / purchaseAmount) * 10000) / 100;
  }
}

export default LottoStats;
