
const sidebar = document.getElementById("mySidebar");
const content = document.getElementById("portalMain");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const sectionTiltle = document.getElementById("sectionTitle");

function getSidebarPercent() {
    const width = sidebar.offsetWidth;
    return (width / window.innerWidth) * 100;
}

function openSidebar() {
    // Let sidebar auto-size (px or max-content or any size)
    sidebar.style.width = "max-content";

    if (window.innerWidth >= 1201) {
        // Wait for rendering to update
        requestAnimationFrame(() => {
            const percent = getSidebarPercent();

            content.style.margin = `0.5% 0.5% 0.5% ${percent + 0.5}%`;
            sectionTiltle.style.marginLeft = `${percent/1.25}%`;
            content.style.width = `calc(${99 - percent}% )`;
        });
    }
}

function closeSidebar() {
    sidebar.style.width = "0";

    if (window.innerWidth >= 1201) {
        sectionTiltle.style.marginLeft = `0`;
        content.style.margin = "0.5% 0.5%";
        content.style.width = "99%";
    }
}

openBtn.addEventListener("click", openSidebar);
closeBtn.addEventListener("click", closeSidebar);

window.addEventListener("resize", () => {
    if (window.innerWidth < 1201) {
        sectionTiltle.style.marginLeft = `0`;
        content.style.margin = "1% 1%";
        content.style.width = "98%";
    } else {
        if (sidebar.offsetWidth > 0) {
            openSidebar(); // recalc percent for new viewport width
        } else {
            closeSidebar();
        }
    }
});