
document.addEventListener("DOMContentLoaded", () => {
    const dropdownTrigger = document.getElementById("userDropdown");
    const userProfileSummary = document.getElementById("profile-summary");
    const closeDropdown = document.getElementById("close-dropdown");

    function showProfileSummary() {
        userProfileSummary.classList.remove('hidden-form');
        userProfileSummary.classList.add('visible-form');
    }

    function hideProfileSummary() {
        userProfileSummary.classList.remove('visible-form');
        userProfileSummary.classList.add('hidden-form');
    }

    function toggleProfileSummary() {
        if (userProfileSummary.classList.contains('hidden-form')) {
            showProfileSummary();
        } else {
            hideProfileSummary();
        }
    }

    dropdownTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleProfileSummary();
    });

    document.addEventListener('click', (e) => {
        e.stopPropagation();
        if (userProfileSummary.classList.contains('visible-form')) {
            hideProfileSummary();
        }
    });

    closeDropdown.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideProfileSummary();
    });

    userProfileSummary.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});