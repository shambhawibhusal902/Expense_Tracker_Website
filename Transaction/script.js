// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar elements
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Dropdown functionality
    const categorySelect = document.getElementById('categorySelect');
    const categoryOptions = document.getElementById('categoryOptions');
    const searchInput = document.getElementById('searchTransactions');
    const clearSearchBtn = document.getElementById('clearSearch');
    const exportDataBtn = document.getElementById('exportData');
    
    // Transaction data
    const transactions = [
        { 
            date: '2025-04-01', 
            description: 'Side hustle', 
            category: 'Income',
            subcategory: 'Dropshipping',
            amount: 1200.00
        },
        { 
            date: '2025-04-03', 
            description: 'Supermarket Shopping', 
            category: 'Expense',
            subcategory: 'Food',
            amount: 69.00
        },
        { 
            date: '2025-04-04', 
            description: 'Fuel Refill', 
            category: 'Expense',
            subcategory: 'Transport',
            amount: 59.00
        },
        { 
            date: '2025-04-05', 
            description: 'Monthly Salary', 
            category: 'Income',
            subcategory: 'Salary',
            amount: 2500.00
        },
        { 
            date: '2025-04-06', 
            description: 'Restaurant Dinner', 
            category: 'Expense',
            subcategory: 'Food',
            amount: 65.75
        },
        { 
            date: '2025-04-07', 
            description: 'Online Shopping', 
            category: 'Expense',
            subcategory: 'Shopping',
            amount: 120.00
        },
        { 
            date: '2025-04-08', 
            description: 'Gym Membership', 
            category: 'Expense',
            subcategory: 'Health',
            amount: 50.00
        }
    ];
    
    // Initialize the app
    function initApp() {
        renderTransactions(transactions);
        setupEventListeners();
        calculateTotalBalance(transactions);
    }
    
    // Render transactions to the table
    function renderTransactions(transactionsToRender) {
        const tableBody = document.getElementById('transactionsTableBody');
        tableBody.innerHTML = '';
        
        transactionsToRender.forEach(transaction => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.description}</td>
                <td><span class="category-text">${transaction.category}</span></td>
                <td><span class="category-text">${transaction.subcategory}</span></td>
                <td><span class="amount">$${transaction.amount.toFixed(2)}</span></td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Calculate and display total balance
    function calculateTotalBalance(transactionsToCalculate) {
        let total = 0;
        
        transactionsToCalculate.forEach(transaction => {
            if (transaction.category === 'Income') {
                total += transaction.amount;
            } else {
                total -= transaction.amount;
            }
        });
        
        const totalAmount = document.querySelector('.total-amount');
        totalAmount.textContent = `$${Math.abs(total).toFixed(2)}`;
        
        // Update color based on positive/negative balance
        if (total >= 0) {
            totalAmount.style.color = '#0c9';
        } else {
            totalAmount.style.color = '#f44';
        }
    }
    
    // Filter transactions by category
    function filterTransactionsByCategory(category) {
        if (category === 'all') {
            renderTransactions(transactions);
            calculateTotalBalance(transactions);
            return;
        }
        
        const filteredTransactions = transactions.filter(transaction => 
            transaction.category.toLowerCase() === category.toLowerCase()
        );
        
        renderTransactions(filteredTransactions);
        calculateTotalBalance(filteredTransactions);
    }
    
    // Filter transactions by search term
    function filterTransactionsBySearch(searchTerm) {
        if (!searchTerm) {
            renderTransactions(transactions);
            calculateTotalBalance(transactions);
            return;
        }
        
        const filteredTransactions = transactions.filter(transaction => 
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.subcategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.date.includes(searchTerm) ||
            transaction.amount.toString().includes(searchTerm)
        );
        
        renderTransactions(filteredTransactions);
        calculateTotalBalance(filteredTransactions);
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Handle mobile menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 992 &&
                sidebar && !sidebar.contains(event.target) &&
                menuToggle && !menuToggle.contains(event.target) &&
                sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });

        // Navigation menu functionality
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                this.classList.add('active');

                // Handle different menu actions
                const menuAction = this.getAttribute('data-section');
                handleMenuAction(menuAction);
                
                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 992 && sidebar) {
                    sidebar.classList.remove('active');
                }
            });
        });
        
        // Toggle dropdown when clicking on the selector
        if (categorySelect) {
            categorySelect.addEventListener('click', (e) => {
                e.stopPropagation();
                categoryOptions.classList.toggle('show');
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            if (categoryOptions) {
                categoryOptions.classList.remove('show');
            }
        });
        
        // Prevent propagation for clicks inside the dropdown menu
        if (categoryOptions) {
            categoryOptions.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Handle category selection
        const options = document.querySelectorAll('.category-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                const selectedCategory = this.dataset.value;
                if (categorySelect) {
                    const span = categorySelect.querySelector('span');
                    if (span) {
                        span.textContent = this.textContent;
                    }
                }
                if (categoryOptions) {
                    categoryOptions.classList.remove('show');
                }
                
                filterTransactionsByCategory(selectedCategory);
            });
        });
        
        // Search functionality with debounce
        let debounceTimeout;
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(() => {
                    filterTransactionsBySearch(this.value);
                }, 300);
            });
        }
        
        // Clear search button functionality
        if (clearSearchBtn && searchInput) {
            clearSearchBtn.addEventListener('click', () => {
                searchInput.value = '';
                filterTransactionsBySearch('');
            });
        }
        
        // Export data functionality
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', exportTransactions);
        }
    }
    
    // Handle menu item clicks
    function handleMenuAction(action) {
        console.log(`Menu action: ${action}`);
        
        // You would implement actual navigation/view switching here
    }
    
    // Add a new transaction
    function addTransaction(transaction) {
        transactions.push(transaction);
        renderTransactions(transactions);
        calculateTotalBalance(transactions);
    }
    
    // Delete a transaction
    function deleteTransaction(index) {
        transactions.splice(index, 1);
        renderTransactions(transactions);
        calculateTotalBalance(transactions);
    }
    
    // Edit a transaction
    function editTransaction(index, updatedTransaction) {
        transactions[index] = updatedTransaction;
        renderTransactions(transactions);
        calculateTotalBalance(transactions);
    }
    
    // Export data functionality
    function exportTransactions() {
        const dataStr = JSON.stringify(transactions, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'transactions.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    
    // Initialize the application
    initApp();
});