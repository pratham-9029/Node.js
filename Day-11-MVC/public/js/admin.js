// ===== TMDB Search =====
async function searchTMDB() {
    const query = document.getElementById('tmdbSearch')?.value;
    const container = document.getElementById('tmdbResults');
    if (!query || !container) return;

    container.innerHTML = '<div class="spinner"></div>';

    try {
        const res = await fetch(`/admin/tmdb/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (data.results && data.results.length > 0) {
            container.innerHTML = data.results.slice(0, 8).map(m => `
                <div style="display:flex; gap:0.8rem; padding:0.8rem; border:1px solid var(--border); border-radius:8px; margin-bottom:0.5rem; align-items:center; background:var(--bg-secondary);">
                    <img src="${m.poster_path ? 'https://image.tmdb.org/t/p/w92' + m.poster_path : ''}" alt="" 
                         style="width:45px; height:65px; object-fit:cover; border-radius:4px; background:var(--bg-primary);"
                         onerror="this.style.display='none'">
                    <div style="flex:1; min-width:0;">
                        <div style="font-weight:600; font-size:0.9rem;">${m.title}</div>
                        <div style="font-size:0.78rem; color:var(--text-muted);">${m.release_date ? m.release_date.substring(0, 4) : 'N/A'} · ⭐ ${m.vote_average?.toFixed(1) || 'N/A'}</div>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="importFromTMDB(${m.id}, this)">Import</button>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem;">No results found. Make sure TMDB_API_KEY is set in your .env file.</p>';
        }
    } catch (err) {
        container.innerHTML = '<p style="color:var(--danger); font-size:0.85rem;">Failed to search TMDB.</p>';
    }
}

async function importFromTMDB(tmdbId, btn) {
    btn.disabled = true;
    btn.textContent = 'Importing...';

    try {
        const res = await fetch(`/admin/tmdb/import/${tmdbId}`, {
            method: 'POST',
            headers: { 'Accept': 'application/json' }
        });
        const data = await res.json();

        if (data.success) {
            btn.textContent = '✅ Imported';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-success');
            showToast(`"${data.movie.title}" imported successfully!`);
        } else {
            btn.textContent = data.error || 'Error';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-ghost');
            showToast(data.error || 'Import failed', 'error');
        }
    } catch (err) {
        btn.textContent = 'Retry';
        btn.disabled = false;
        showToast('Network error', 'error');
    }
}

// TMDB search on Enter
document.getElementById('tmdbSearch')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); searchTMDB(); }
});
