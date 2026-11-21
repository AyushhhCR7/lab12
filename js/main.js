/**
 * Main Application Utilities & Shared Helpers
 */

function formatCurrency(amount) {
    const num = parseFloat(amount) || 0;
    return '$' + num.toFixed(2);
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.4;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<span class="star star-filled">★</span>';
    }
    if (hasHalfStar) {
        starsHtml += '<span class="star star-half">★</span>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<span class="star star-empty">☆</span>';
    }
    return `<span class="stars-wrapper" title="${rating} out of 5 stars">${starsHtml} <span class="rating-number">(${rating.toFixed(1)})</span></span>`;
}

// Mobile Navbar Toggle & Header search handling
document.addEventListener('DOMContentLoaded', () => {
    // Current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile nav toggle
    const mobileToggle = document.getElementById('mobileNavToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });
    }

    // Global search bar in navbar
    const globalSearchForm = document.getElementById('navbarSearchForm');
    const globalSearchInput = document.getElementById('navbarSearchInput');
    if (globalSearchForm && globalSearchInput) {
        globalSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = globalSearchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            } else {
                window.location.href = `products.html`;
            }
        });
    }
});
