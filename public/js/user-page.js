const updateBtn = document.querySelector('.form__update-budget-btn');
const budgetInfoSpan = document.querySelector('.information__amount--budget');
const budgetInput = document.querySelector('input[name="budget"]');

const addExpenseBtn = document.querySelector('.form__add-expense-btn');
const expenseInfoSpan = document.querySelector('.information__amount--expense');
const expenseTitleInput = document.querySelector('input[name="title"]');
const expenseAmountInput = document.querySelector('input[name="expense"]');

const balanceInfoSpan = document.querySelector('.information__amount--balance');

const saveExpensesButton = document.querySelector('#save-expenses-btn');

const budget = new Budget();
const expense = new Expense();

updateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (budgetInput.value === '') {
    return;
  }

  budget.isValueCorrect(Number(budgetInput.value));
  budget.updateBudget(budgetInfoSpan);
  budget.checkBalance(expenseInfoSpan, balanceInfoSpan);
  console.log(budget.budgetAmounts);
  document.querySelector('#form-budget').submit();
  budgetInput.value = '';
});

addExpenseBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (
    expenseTitleInput.value === '' ||
    expenseAmountInput.value === '' ||
    expenseAmountInput.value < 0 ||
    expenseAmountInput.value == 0
  )
    return;

  expense.isExpenseCorrect(
    expenseTitleInput.value,
    Number(expenseAmountInput.value),
  );

  expense.updateExpense(expenseInfoSpan);
  expense.updateBalance(
    balanceInfoSpan,
    budget.budgetAmounts[budget.budgetAmounts.length - 1],
    Number(expenseInfoSpan.textContent),
  );

  expense.addExpenseToTable();

  expenseTitleInput.value = '';
  expenseAmountInput.value = '';

  expense.showSaveExpensesButton(saveExpensesButton);
});
