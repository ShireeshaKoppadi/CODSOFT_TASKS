// ================================
// UI Functions
// ================================

let editingId = null;

// Display Transactions
function displayTransactions(filter = "All") {

    const transactionList = document.getElementById("transactionList");
    transactionList.innerHTML = "";

    let transactions = getTransactions();

    const searchText = document
    .getElementById("searchInput")
    ?.value
    .toLowerCase() || "";

    // Filter
    if (filter !== "All") {
        transactions = transactions.filter(
            transaction => transaction.category === filter
        );
    }

    if (searchText !== "") {

    transactions = transactions.filter(transaction =>

        transaction.category
            .toLowerCase()
            .includes(searchText)

        ||

        transaction.description
            .toLowerCase()
            .includes(searchText)

    );

}

    // Latest first
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Empty State
    if (transactions.length === 0) {

        transactionList.innerHTML = `
            <tr>
                <td colspan="6">
                    No Transactions Found
                </td>
            </tr>
        `;

        return;
    }

    transactions.forEach(transaction => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.category}</td>
            <td>${transaction.description}</td>
            <td>
                <span style="color:${transaction.type === "income" ? "green" : "red"};">
                    ${transaction.type.toUpperCase()}
                </span>
            </td>
            <td>₹${Number(transaction.amount).toFixed(2)}</td>
            <td>
                <button class="edit-btn"
                    onclick="editTransaction(${transaction.id})">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="delete-btn"
                    onclick="removeTransaction(${transaction.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        transactionList.appendChild(row);

    });

}

// ================================
// Delete
// ================================

function removeTransaction(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    deleteTransaction(id);

    showToast("Transaction Deleted Successfully!", "#ef4444");

    displayTransactions(
        document.getElementById("filterCategory").value
    );

    updateSummaryCards();

}

// ================================
// Edit
// ================================

function editTransaction(id) {

    const transactions = getTransactions();

    const transaction = transactions.find(item => item.id === id);

    if (!transaction) return;

    editingId = id;

    document.getElementById("type").value = transaction.type;
    document.getElementById("amount").value = transaction.amount;
    document.getElementById("category").value = transaction.category;
    document.getElementById("date").value = transaction.date;
    document.getElementById("description").value = transaction.description;

    document.querySelector(".btn").innerHTML =
        `<i class="fa-solid fa-pen"></i> Update Transaction`;

}

// ================================
// Reset Form
// ================================

function resetForm() {

    editingId = null;

    document.getElementById("transactionForm").reset();

    document.querySelector(".btn").innerHTML =
        `<i class="fa-solid fa-plus"></i> Add Transaction`;

}

// ================================
// Toast Notification
// ================================

function showToast(message, color = "#22c55e") {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.style.background = color;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}