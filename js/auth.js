/**
 * Authentication and User Session Management
 */

const USERS_STORAGE_KEY = 'shopverse_registered_users';
const CURRENT_USER_KEY = 'shopverse_active_user';

// Initialize default demo user if not present
function initializeUsers() {
    let users = [];
    try {
        const stored = localStorage.getItem(USERS_STORAGE_KEY);
        if (stored) {
            users = JSON.parse(stored);
        }
    } catch (e) {
        users = [];
    }

    if (!users.some(u => u.email === 'demo@shopverse.com')) {
        users.push({
            name: 'Ayush Kumar',
            email: 'demo@shopverse.com',
            password: 'password123',
            joined: '2026-01-15'
        });
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
}

initializeUsers();

function getCurrentUser() {
    try {
        const user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    } catch (e) {
        return null;
    }
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

    if (user) {
        const sessionUser = {
            name: user.name,
            email: user.email,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
        updateAuthNavbar();
        return { success: true, user: sessionUser };
    } else {
        return { success: false, message: 'Invalid email or password. Please try again or use demo account: demo@shopverse.com / password123' };
    }
}

function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
    const cleanEmail = email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, message: 'An account with this email already exists. Please login instead.' };
    }

    const newUser = {
        name: name.trim(),
        email: cleanEmail,
        password: password,
        joined: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Automatically log in the new user
    const sessionUser = {
        name: newUser.name,
        email: newUser.email,
        loginTime: new Date().toISOString()
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
    updateAuthNavbar();

    return { success: true, user: sessionUser };
}

function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
    updateAuthNavbar();
    if (typeof showToast === 'function') {
        showToast('You have been logged out.', 'info');
    }
    // If on account/checkout page that requires login, stay or refresh
    setTimeout(() => {
        window.location.reload();
    }, 500);
}

function updateAuthNavbar() {
    const currentUser = getCurrentUser();
    const authContainers = document.querySelectorAll('.nav-auth-container');

    authContainers.forEach(container => {
        if (currentUser) {
            container.innerHTML = `
                <div class="user-menu-wrapper">
                    <button class="user-menu-btn" id="userMenuBtn">
                        <span class="user-avatar">${currentUser.name.charAt(0).toUpperCase()}</span>
                        <span class="user-name">Hi, ${currentUser.name.split(' ')[0]}</span>
                        <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    <div class="user-dropdown-menu" id="userDropdown">
                        <div class="dropdown-header">
                            <strong>${currentUser.name}</strong>
                            <small>${currentUser.email}</small>
                        </div>
                        <a href="cart.html" class="dropdown-item">My Cart</a>
                        <a href="checkout.html" class="dropdown-item">Checkout</a>
                        <hr class="dropdown-divider">
                        <button onclick="logoutUser()" class="dropdown-item dropdown-logout-btn">Log Out</button>
                    </div>
                </div>
            `;

            const btn = container.querySelector('#userMenuBtn');
            const dropdown = container.querySelector('#userDropdown');
            if (btn && dropdown) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdown.classList.toggle('show');
                });
            }
        } else {
            container.innerHTML = `
                <a href="login.html" class="nav-btn nav-btn-outline">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span>Sign In</span>
                </a>
            `;
        }
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.user-dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
    });
});

document.addEventListener('DOMContentLoaded', updateAuthNavbar);

