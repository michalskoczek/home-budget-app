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

  if (number === 1) {
    const expenseHtml = `<table class="table table-striped">
  <tbody>
    <tr>
      <th scope="row">${number}</th>
      <td>${expenseDB[0].title}</td>
      <td>${expenseDB[0].amount}</td>
      <td class="table__buttons">
      <button><ion-icon class="table__icon text-success" name="create"></ion-icon></button>
			<button><ion-icon class="table__icon text-danger" name="trash"></ion-icon></button>
      </td>
    </tr>
  </tbody>
</table>`;

    document.querySelector('.table').innerHTML = expenseHtml;
  } else if (number > 1) {
    const tableTbody = document.querySelector('.table tbody');
    const tr = document.createElement('tr');
    const expenseHtml = `<th scope="row">${number}</th>
      <td>${expenseDB[expenseDB.length - 1].title}</td>
      <td>${expenseDB[expenseDB.length - 1].amount}</td>
      <td class="table__buttons">
      <button><ion-icon class="table__icon text-success" name="create"></ion-icon></button>
			<button><ion-icon class="table__icon text-danger" name="trash"></ion-icon></button>
      </td>`;
    tr.innerHTML = expenseHtml;
    tableTbody.appendChild(tr);
  }
});
