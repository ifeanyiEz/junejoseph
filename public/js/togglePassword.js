
document.addEventListener("DOMContentLoaded", () => {
    const togglePassword = document.querySelector("#togglePassword");
    const password = document.querySelector("#password");
    const eyeIcon = document.querySelector("#eyeIcon");

    togglePassword.addEventListener("click", () => {
        // Toggle the type attribute
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        
        // Toggle the eye / eye-slash icon
        eyeIcon.classList.toggle("bi-eye");
        eyeIcon.classList.toggle("bi-eye-slash");
    });
});