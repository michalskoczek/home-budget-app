class Expense {
  constructor() {
    this.expenses = [];
  }

  isExpenseCorrect(expenseTitle, expenseAmount) {
    if (
      typeof expenseAmount === 'number' &&
      expenseAmount > 0 &&
      !isNaN(expenseAmount) &&
      typeof expenseTitle === 'string' &&
      expenseTitle !== ''
    ) {
      let expense = {
        expenseTitle: expenseTitle,
        expenseAmount: expenseAmount,
        expenseDate: new Date().toLocaleDateString(),
      };
      this.expenses.push(expense);
      console.log(this.expenses);
    }
  }

  updateExpense(showExpense) {
    if (this.expenses.length === 0) return;
    let sum = 0;
    for (let i = 0; i < this.expenses.length; i++) {
      sum += this.expenses[i].expenseAmount;
    }
    showExpense.innerText = sum;
  }

  updateBalance(showBalance, budget, expense) {
    if (typeof budget === 'undefined') {
      showBalance.innerText = 'Fill your budget';
    } else {
      showBalance.innerText = budget - expense;
    }
  }
}
