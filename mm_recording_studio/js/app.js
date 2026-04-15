// Myanmar Recording Studio - Main App JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Handle multi-user login
    const userIdInput = document.getElementById('userId');
    if (userIdInput) {
        // Save userId to localStorage
        const savedUserId = localStorage.getItem('userId');
        if (savedUserId) {
            userIdInput.value = savedUserId;
        }
        
        userIdInput.addEventListener('change', () => {
            localStorage.setItem('userId', userIdInput.value);
        });
        
        // Update language links with userId
        updateLanguageLinks();
    }
});

function updateLanguageLinks() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    
    const languageLinks = document.querySelectorAll('.language-btn');
    languageLinks.forEach(link => {
        const url = new URL(link.href);
        url.searchParams.set('userId', userId);
        link.href = url.toString();
    });
}