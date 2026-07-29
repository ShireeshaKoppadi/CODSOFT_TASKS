// ================================
// App Initialization
// ================================

const form = document.getElementById("transactionForm");
const filter = document.getElementById("filterCategory");
const searchInput = document.getElementById("searchInput");

// ================================
// Add / Update Transaction
// ================================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    if (
        type === "" ||
        amount === "" ||
        category === "" ||
        date === "" ||
        description === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    const transaction = {
        id: editingId ? editingId : Date.now(),
        type,
        amount: Number(amount),
        category,
        date,
        description
    };

    if (editingId) {
        updateTransaction(transaction);
    } else {
        addTransaction(transaction);
    }

    resetForm();

    displayTransactions(filter.value);

    updateSummaryCards();

});

searchInput.addEventListener("input", function () {

    displayTransactions(filter.value);

});

// ================================
// Filter Transactions
// ================================

filter.addEventListener("change", function () {

    displayTransactions(this.value);

});

// ================================
// Load Page
// ================================

window.onload = function () {

    displayTransactions();

    updateSummaryCards();

    showToast(
    editingId
        ? "Transaction Updated Successfully!"
        : "Transaction Added Successfully!"
);

};