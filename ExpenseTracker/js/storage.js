// ================================
// Local Storage Functions
// ================================

const STORAGE_KEY = "expenseTrackerTransactions";

// Get all transactions
function getTransactions() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    }

    return [];
}

// Save transactions
function saveTransactions(transactions) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
    );
}

// Add new transaction
function addTransaction(transaction) {
    const transactions = getTransactions();

    transactions.push(transaction);

    saveTransactions(transactions);
}

// Update transaction
function updateTransaction(updatedTransaction) {

    let transactions = getTransactions();

    transactions = transactions.map(transaction => {

        if (transaction.id === updatedTransaction.id) {
            return updatedTransaction;
        }

        return transaction;
    });

    saveTransactions(transactions);
}

// Delete transaction
function deleteTransaction(id) {

    let transactions = getTransactions();

    transactions = transactions.filter(transaction => transaction.id !== id);

    saveTransactions(transactions);
}