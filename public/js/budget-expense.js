const updateBtn = document.querySelector('.form__update-budget-btn');
const budgetInfoSpan = document.querySelector('.information__amount--budget');
const budgetInput = document.querySelector('input[name="budget"]');

updateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const budgetAmount = budgetInput.value;
  if (budgetAmount > 0 && budgetAmount !== NaN) {
    budgetInfoSpan.innerText = budgetAmount;
  }
  budgetInput.value = '';
});

const addExpenseBtn = document.querySelector('.form__add-expense-btn');
const expenseInfoSpan = document.querySelector('.information__amount--expense');
const expenseTitleInput = document.querySelector('input[name="title"]');
const expenseAmountInput = document.querySelector('input[name="amount"]');
let number = 0;
const expenseDB = [];

addExpenseBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const expenseTitle = expenseTitleInput.value;
  const expenseAmount = expenseAmountInput.value;
  if (expenseAmount > 0 && expenseAmount !== NaN) {
    expenseInfoSpan.innerText = expenseAmount;
    number++;
    expenseDB.push({
      number: number,
      title: expenseTitle,
      amount: expenseAmount,
    });
  }
  expenseTitleInput.value = '';
  expenseAmountInput.value = '';

  console.log(expenseDB);

  if (number === 1) {
    const expenseHtml = `<table class="table">
  <tbody>
    <tr>
      <th scope="row">${number}</th>
      <td>${expenseDB[0].title}</td>
      <td>${expenseDB[0].amount}</td>
      <td><ion-icon name="create"></ion-icon></td>
      <td><ion-icon name="trash"></ion-icon></td>
    </tr>
  </tbody>
</table>`;

    document.querySelector('.table').innerHTML = expenseHtml;
  } else if (number > 1) {
    const tableTr = document.querySelector('.table tr');
    for (let i = 1; i < expenseDB.length; i++) {
      const expenseHtml = `<th scope="row">${number}</th>
      <td>${expenseDB[i].title}</td>
      <td>${expenseDB[i].amount}</td>
      <td><ion-icon name="create"></ion-icon></td>
      <td><ion-icon name="trash"></ion-icon></td>`;

      tableTr.appendChild(expenseHtml);
    }
  }
});
