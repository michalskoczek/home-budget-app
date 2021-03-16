class Balance {
  constructor(budgetAmounts) {
    this.budgetAmounts = budgetAmounts;
  }
  checkBalance(showExpense, showBalance) {
    if (showExpense.textContent === '---') {
      return;
    } else {
      showBalance.innerText =
        this.budgetAmounts[this.budgetAmounts.length - 1] -
        Number(showExpense.innerText);
    }
  }
}
