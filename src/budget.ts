type Entry = {
    description: string;
    amount: number;
    type: 'income' | 'expense';
};

const entries: Entry[] = [];

const entryForm = document.getElementById('entryForm') as HTMLFormElement;
const descInput = document.getElementById('descInput') as HTMLInputElement;
const amountInput = document.getElementById('amountInput') as HTMLInputElement;
const typeInput = document.getElementById('typeInput') as HTMLSelectElement;
const entriesTbody = document.getElementById('entries') as HTMLTableSectionElement;
const totalIncomeSpan = document.getElementById('totalIncome') as HTMLSpanElement;
const totalExpensesSpan = document.getElementById('totalExpenses') as HTMLSpanElement;
const balanceSpan = document.getElementById('balance') as HTMLSpanElement;

function render() {
    entriesTbody.innerHTML = '';
    let totalIncome = 0;
    let totalExpenses = 0;

    entries.forEach(entry => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${entry.description} - ₦${entry.amount.toFixed(2)}</td>
            <td>
                <span class="${entry.type === 'income' ? 'income-text' : 'expense-text'}">
                    ${entry.type}
                </span>
            </td>
        `;
        entriesTbody.appendChild(tr);

        if (entry.type === 'income') {
            totalIncome += entry.amount;
        } else {
            totalExpenses += entry.amount;
        }
    });

    const balance = totalIncome - totalExpenses;
    totalIncomeSpan.textContent = `₦${totalIncome.toFixed(2)}`;
    totalExpensesSpan.textContent = `₦${totalExpenses.toFixed(2)}`;
    balanceSpan.textContent = `₦${balance.toFixed(2)}`;
    balanceSpan.className = balance >= 0 ? 'positive' : 'negative';
}

entryForm.onsubmit = (e) => {
    e.preventDefault();
    const description = descInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value as 'income' | 'expense';
    if (description && !isNaN(amount)) {
        entries.push({ description, amount, type });
        descInput.value = '';
        amountInput.value = '';
        typeInput.value = 'income';
        render();
    }
};

render();