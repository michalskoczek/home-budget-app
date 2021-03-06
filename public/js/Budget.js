class Budget {
  constructor() {
    this.budgetAmounts = [];
  }

  isValueCorrect(value) {
    if (
      typeof value === 'number' &&
      !isNaN(value) &&
      value > 0 &&
      value !== '0' &&
      value !== '-0' &&
      value !== ''
    ) {
      this.budgetAmounts.push(value);
    } else {
      return;
    }
  }

  updateBudget(showBudget) {
    showBudget.innerText = this.budgetAmounts[this.budgetAmounts.length - 1];
  }

  checkBalance(showExpense, showBalance) {
    const balance = new Balance(this.budgetAmounts);
    balance.checkBalance(showExpense, showBalance);
  }
}
