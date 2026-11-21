/**
 * Cart Management System
 * Uses localStorage to persist cart across pages
 */

const CART_STORAGE_KEY = 'shopverse_cart_items';
const PROMO_CODES = {
    'SAVE10': { discount: 0.10, label: '10% Off' },
    'SUMMER20': { discount: 0.20, label: '20% Off' },
    'WELCOME15': { discount: 0.15, label: '15% Off' }
};

function getCart() {
    try {
        const data = localStorage.getItem(CART_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error reading cart from localStorage', e);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartBadges();
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
    } catch (e) {
        console.error('Error saving cart to localStorage', e);
    }
}

function addToCart(product, qty = 1) {
    const quantity = parseInt(qty, 10) || 1;
    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            image: product.image || product.thumbnail,
            category: product.category,
            quantity: quantity
        });
    }

    saveCart(cart);
    showToast(`Added "${product.name}" (${quantity}) to cart!`, 'success');
}

function updateQuantity(productId, quantity) {
    const qty = parseInt(quantity, 10);
    let cart = getCart();

    if (qty <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity = qty;
        saveCart(cart);
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    const removedItem = cart.find(i => i.id === productId);
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    if (removedItem) {
        showToast(`Removed "${removedItem.name}" from cart.`, 'info');
    }
}

function clearCart() {
    saveCart([]);
    showToast('Shopping cart has been cleared.', 'info');
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
}

function getCartSubtotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
}

function updateCartBadges() {
    const count = getCartCount();
    const badges = document.querySelectorAll('.cart-badge, #cart-badge');
    badges.forEach(badge => {
        badge.textContent = count;
        if (count > 0) {
            badge.style.display = 'inline-flex';
            badge.classList.add('badge-pop');
            setTimeout(() => badge.classList.remove('badge-pop'), 300);
        } else {
            badge.style.display = 'inline-flex';
            badge.textContent = '0';
        }
    });
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type} toast-enter`;

    const iconMap = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };

    toast.innerHTML = `
        <span class="toast-icon">${iconMap[type] || 'ℹ'}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('toast-enter');
    }, 10);

    setTimeout(() => {
        toast.classList.add('toast-leave');
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 300);
    }, 3500);
}

// Auto update badge on DOM ready
document.addEventListener('DOMContentLoaded', updateCartBadges);

