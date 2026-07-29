// ================================
// Calculation Functions
// ================================

// Calculate totals
function calculateSummary() {

    const transactions = getTransactions();

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            totalIncome += Number(transaction.amount);
        } else {
            totalExpense += Number(transaction.amount);
        }

    });

    const balance = totalIncome - totalExpense;

    return {
        income: totalIncome,
        expense: totalExpense,
        balance: balance
    };
}

// Update Summary Cards
function updateSummaryCards() {

    const summary = calculateSummary();

    document.getElementById("income").textContent =
        `₹${summary.income.toFixed(2)}`;

    document.getElementById("expense").textContent =
        `₹${summary.expense.toFixed(2)}`;

    document.getElementById("balance").textContent =
        `₹${summary.balance.toFixed(2)}`;
}