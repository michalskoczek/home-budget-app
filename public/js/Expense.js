class Expense {
  constructor() {
    this.expenses = [];
    this.expensesList = [];
    this.deletedElements = [];
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

  editExpense() {
    console.log('edit');
  }

  deleteExpense(e) {
    const index = e.target.parentNode.parentNode.parentNode.dataset.key;

    let deletedTr = expense.expenses.splice(index, 1);
    expense.deletedElements.push(deletedTr[0]);

    const currentExpenseValue = Number(expenseInfoSpan.textContent);
    const expenseValue = Number(
      expense.expensesList[index].childNodes[1].textContent,
    );
    const diff = currentExpenseValue - expenseValue;
    expenseInfoSpan.innerText = diff;

    if (balanceInfoSpan.textContent !== 'Fill your budget') {
      const currentBalanceValue = Number(balanceInfoSpan.textContent);
      const bal = currentBalanceValue + expenseValue;
      balanceInfoSpan.innerText = bal;
    }

    expense.expensesList.splice(index, 1);

    document.querySelector('.table tbody').textContent = '';

    expense.expensesList.forEach((element, key) => {
      element.dataset.key = key;
      document.querySelector('.table tbody').appendChild(element);
    });
  }

  addExpenseToTable() {
    const tableTbody = document.querySelector('.table tbody');
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerText = this.expenses.length;

    const tdTitle = document.createElement('td');
    tdTitle.innerText = this.expenses[this.expenses.length - 1].expenseTitle;

    const tdAmount = document.createElement('td');
    tdAmount.innerText = this.expenses[this.expenses.length - 1].expenseAmount;

    const tdButtons = document.createElement('td');
    tdButtons.classList.add('table__buttons');

    const buttonEdit = document.createElement('button');
    const iconEdit = document.createElement('ion-icon');
    buttonEdit.setAttribute('id', 'edit');
    iconEdit.classList.add('table__icon');
    iconEdit.classList.add('text-success');
    iconEdit.setAttribute('name', 'create');
    buttonEdit.appendChild(iconEdit);
    tdButtons.appendChild(buttonEdit);

    const buttonDelete = document.createElement('button');
    const iconDelete = document.createElement('ion-icon');
    buttonDelete.setAttribute('id', 'delete');
    iconDelete.classList.add('table__icon');
    iconDelete.classList.add('text-danger');
    iconDelete.setAttribute('name', 'trash');
    buttonDelete.appendChild(iconDelete);
    tdButtons.appendChild(buttonDelete);

    tr.appendChild(th);
    tr.appendChild(tdTitle);
    tr.appendChild(tdAmount);
    tr.appendChild(tdButtons);

    this.expensesList.push(tr);

    this.expensesList.forEach((element, key) => {
      element.dataset.key = key;
      tableTbody.appendChild(element);
    });

    tr.querySelector('#edit').addEventListener('click', this.editExpense);
    tr.querySelector('#delete').addEventListener('click', this.deleteExpense);
  }
}
