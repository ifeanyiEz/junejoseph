
document.addEventListener("DOMContentLoaded", () => {
    const currentURL = window.location.pathname;

    document.querySelectorAll('.my-sidebar a').forEach(link => {
        const linkPath = link.getAttribute('href');

        if (linkPath && currentURL.endsWith(linkPath)) {
            link.classList.add('active');
        }
    });
});