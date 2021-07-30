const updateBtn = document.querySelector('.form__update-budget-btn');
const budgetInfoSpan = document.querySelector('.information__amount--budget');
const budgetInput = document.querySelector('input[name="budget"]');

const addExpenseBtn = document.querySelector('.form__add-expense-btn');
const expenseInfoSpan = document.querySelector('.information__amount--expense');
const expenseTitleInput = document.querySelector('input[name="title"]');
const expenseAmountInput = document.querySelector('input[name="expense"]');

const balanceInfoSpan = document.querySelector('.information__amount--balance');

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

  // expense.updateExpense(expenseInfoSpan);
  // expense.updateBalance(
  //   balanceInfoSpan,
  //   Number(budgetInfoSpan.textContent),
  //   Number(expenseInfoSpan.textContent),
  // );

  //expense.addExpenseToTable();
  console.log('add expense submit');
  document.querySelector('#form-expense').submit();
  expenseTitleInput.value = '';
  expenseAmountInput.value = '';
});

const createButtonCorrectExpense = () => {
  const buttonCorrectExpense = document.createElement('button');
  buttonCorrectExpense.className = 'form__add-expense-btn btn btn-danger';
  buttonCorrectExpense.id = 'update-expense';
  buttonCorrectExpense.innerText = 'Update expense';
  buttonCorrectExpense.setAttribute('type', 'button');
  document.querySelector('#expenses form').appendChild(buttonCorrectExpense);
};

const editExpenseButton = [...document.querySelectorAll('#edit')];

editExpenseButton.forEach((element, index) => {
  element.addEventListener('click', () => {
    console.log('edit click' + index);
    addExpenseBtn.remove();
    createButtonCorrectExpense();

    const expensesTitlesArray = [
      ...document.querySelectorAll('#form-title-expense'),
    ];
    const expensesAmountsArray = [
      ...document.querySelectorAll('#form-amount-expense'),
    ];

    expenseTitleInput.value = expensesTitlesArray[index].textContent;
    expenseAmountInput.value = expensesAmountsArray[index].textContent;

    const urlPathname = window.location.pathname;
    const urlUserName = urlPathname.slice(6);

    document
      .querySelector('#form-expense')
      .setAttribute('action', `/user/${urlUserName}/expense/edit`);

    const updateExpenseButton = document.querySelector('#update-expense');
    updateExpenseButton.addEventListener('click', () => {
      document.querySelector('#form-expense').submit();
    });
  });
});
