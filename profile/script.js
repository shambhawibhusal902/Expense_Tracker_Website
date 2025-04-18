    
    // Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements
    const signOutBtn = document.getElementById('sign-out-btn');
    const saveChangesBtn = document.getElementById('save-changes-btn');
    const loginModal = document.getElementById('login-modal');
    const loginBtn = document.getElementById('login-btn');
    const editAvatarBtn = document.querySelector('.edit-avatar-btn');
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    // Toggle switches
    const budgetWarningsToggle = document.getElementById('budget-warnings');
    const expenseSummariesToggle = document.getElementById('expense-summaries');
    
    // Add menu toggle button if it doesn't exist
    if (!menuToggle) {
      const toggle = document.createElement('button');
      toggle.id = 'menuToggle';
      toggle.className = 'menu-toggle';
      toggle.innerHTML = '☰';
      document.body.insertBefore(toggle, document.body.firstChild);
    }
    
    // Handle menu toggle for mobile
    document.getElementById('menuToggle').addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
      if (window.innerWidth <= 992 &&
          !sidebar.contains(event.target) &&
          !document.getElementById('menuToggle').contains(event.target) &&
          sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }
    });
    
    // Navigation functionality
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(navItem => {
          navItem.classList.remove('active');
        });
        this.classList.add('active');
        
        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 992) {
          sidebar.classList.remove('active');
        }
      });
    });
    
    // Sign Out button functionality
    signOutBtn.addEventListener('click', function() {
      // Show confirmation dialog
      if (confirm("Are you sure you want to sign out?")) {
        // Show login modal
        loginModal.style.display = 'flex';
      }
    });
    
    // Save Changes button functionality
    saveChangesBtn.addEventListener('click', function() {
      // Get form values
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      
      // Validate inputs
      if (!username || !email) {
        alert("Please fill in all required fields.");
        return;
      }
      
      // Create data object that would be sent to server
      const userData = {
        username: username,
        email: email,
        notifications: {
          budgetWarnings: budgetWarningsToggle.checked,
          expenseSummaries: expenseSummariesToggle.checked
        }
      };
      
      // Log the data (in a real app, this would be sent to a server)
      console.log("Saving user data:", userData);
      
      // Update username in the sidebar
      if (document.querySelector('.user-name')) {
        document.querySelector('.user-name').textContent = username;
      }
      
      // Show success message
      alert("Profile changes saved successfully!");
    });
    
    // Login button functionality
    loginBtn.addEventListener('click', function() {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;
      
      // Basic validation
      if (!username || !password) {
        alert("Please enter both username and password.");
        return;
      }
      
      // Hide the login modal (simulating successful login)
      loginModal.style.display = 'none';
      
      // Update the profile with the new username (just for demo)
      document.getElementById('username').value = username;
      if (document.querySelector('.user-name')) {
        document.querySelector('.user-name').textContent = username;
      }
    });
    
    // Edit avatar functionality
    editAvatarBtn.addEventListener('click', function() {
      // In a real app, this would open a file picker
      alert("This would open an avatar upload dialog in a real application.");
    });
    
    // Close login modal if user clicks outside of it
    window.addEventListener('click', function(event) {
      if (event.target === loginModal) {
        loginModal.style.display = 'none';
      }
    });
    
    // Handle links in the login modal
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
      e.preventDefault();
      alert("This would navigate to password recovery in a real application.");
    });
    
    document.querySelector('.register-link').addEventListener('click', function(e) {
      e.preventDefault();
      alert("This would navigate to registration in a real application.");
    });
  });