const updateBtn = document.querySelector('.form__update-budget-btn');
const budgetInfoSpan = document.querySelector('.information__amount--budget');
const budgetInput = document.querySelector('input[name="budget"]');

const expenseInfoSpan = document.querySelector('.information__amount--expense');

const balanceInfoSpan = document.querySelector('.information__amount--balance');

updateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (budgetInput.value === '') {
    return;
  }

  const budget = new Budget();
  budget.isValueCorrect(Number(budgetInput.value));
  budgetInput.value = '';
  budget.updateBudget(budgetInfoSpan);
  budget.checkBalance(expenseInfoSpan, balanceInfoSpan);
});

const addExpenseBtn = document.querySelector('.form__add-expense-btn');
const expenseTitleInput = document.querySelector('input[name="title"]');
const expenseAmountInput = document.querySelector('input[name="amount"]');
let number = 0;
const expenseDB = [];
const expense = new Expense();
addExpenseBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (
    expenseTitleInput.value === '' ||
    expenseAmountInput.value === '' ||
    expenseAmountInput.value < 0 ||
    expenseAmountInput.value == 0
  ) {
    return;
  }

  console.log(expenseTitleInput.value, expenseAmountInput.value);
  expense.isExpenseCorrect(
    expenseTitleInput.value,
    Number(expenseAmountInput.value),
  );

  expenseTitleInput.value = '';
  expenseAmountInput.value = '';
});
