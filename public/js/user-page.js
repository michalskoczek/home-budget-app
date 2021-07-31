const addExpenseBtn = document.querySelector('.form__add-expense-btn');
const expenseTitleInput = document.querySelector('input[name="title"]');
const expenseAmountInput = document.querySelector('input[name="expense"]');

const createButtonCorrectExpense = () => {
  const buttonCorrectExpense = document.createElement('button');
  buttonCorrectExpense.className = 'form__add-expense-btn btn btn-danger';
  buttonCorrectExpense.id = 'update-expense';
  buttonCorrectExpense.innerText = 'Correct expense';
  buttonCorrectExpense.setAttribute('type', 'button');
  document.querySelector('#expenses form').appendChild(buttonCorrectExpense);
};

const editExpenseButton = [...document.querySelectorAll('#edit')];

editExpenseButton.forEach((element, index) => {
  element.addEventListener('click', () => {
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

    const hiddenInputs = [...document.querySelectorAll('#expenseId')];
    const expenseId = hiddenInputs[index].value;

    document
      .querySelector('#form-expense')
      .setAttribute(
        'action',
        `/user/${urlUserName}/expense/edit?expenseId=${expenseId}`,
      );

    const updateExpenseButton = document.querySelector('#update-expense');
    updateExpenseButton.addEventListener('click', () => {
      document.querySelector('#form-expense').submit();
    });
  });
});
