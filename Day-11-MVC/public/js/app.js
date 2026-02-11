// ===== Toast Notifications =====
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ===== Star Rating =====
function setRating(field, value) {
    document.getElementById(`rating-${field}`).value = value;
    const stars = document.querySelectorAll(`.stars[data-field="${field}"] .star`);
    stars.forEach((star, i) => {
        star.classList.toggle('filled', i < value);
    });
}

// Initialize star hover effects
document.querySelectorAll('.stars').forEach(container => {
    const stars = container.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => s.style.color = i <= index ? 'var(--gold)' : 'var(--text-muted)');
        });
    });
    container.addEventListener('mouseleave', () => {
        const field = container.dataset.field;
        const input = document.getElementById(`rating-${field}`);
        const val = input ? parseInt(input.value) || 0 : 0;
        stars.forEach((s, i) => s.style.color = i < val ? 'var(--gold)' : 'var(--text-muted)');
    });
});

// ===== Watchlist Modal =====
function showWatchlistModal() {
    const modal = document.getElementById('watchlistModal');
    if (modal) modal.classList.add('active');
}
function closeWatchlistModal() {
    const modal = document.getElementById('watchlistModal');
    if (modal) modal.classList.remove('active');
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
    });
});

// ===== Watchlist Form =====
const watchlistForm = document.getElementById('watchlistForm');
if (watchlistForm) {
    watchlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(watchlistForm);
        const data = Object.fromEntries(formData);
        try {
            const res = await fetch('/watchlist/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                showToast('Watchlist updated!');
                closeWatchlistModal();
                setTimeout(() => location.reload(), 800);
            } else {
                showToast(result.error || 'Failed to update', 'error');
            }
        } catch (err) {
            showToast('Network error', 'error');
        }
    });
}

// ===== Toggle Like =====
async function toggleLike(reviewId, btn) {
    try {
        const res = await fetch(`/review/${reviewId}/like`, {
            method: 'POST',
            headers: { 'Accept': 'application/json' }
        });
        const result = await res.json();
        if (result.success) {
            const span = btn.querySelector('span');
            if (span) span.textContent = result.likes;
        }
    } catch (err) {
        showToast('Failed to like', 'error');
    }
}

// ===== Watchlist Status Update =====
async function updateWatchlistStatus(entryId, status) {
    try {
        const res = await fetch(`/watchlist/update/${entryId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ status })
        });
        const result = await res.json();
        if (result.success) {
            showToast('Status updated!');
        } else {
            showToast(result.error || 'Failed to update', 'error');
        }
    } catch (err) {
        showToast('Network error', 'error');
    }
}

// ===== Remove from Watchlist =====
async function removeFromWatchlist(entryId) {
    if (!confirm('Remove from watchlist?')) return;
    try {
        const res = await fetch(`/watchlist/remove/${entryId}`, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json' }
        });
        const result = await res.json();
        if (result.success) {
            const el = document.getElementById(`wl-${entryId}`);
            if (el) { el.style.opacity = '0'; el.style.transform = 'translateX(50px)'; setTimeout(() => el.remove(), 300); }
            showToast('Removed from watchlist');
        }
    } catch (err) {
        showToast('Failed to remove', 'error');
    }
}

// ===== Search form submit on Enter =====
const searchForm = document.getElementById('searchForm');
if (searchForm) {
    searchForm.querySelector('input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchForm.submit();
    });
}
