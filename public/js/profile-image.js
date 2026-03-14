
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('profile_image').addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            const imageURL = URL.createObjectURL(file);
            document.getElementById('profile-preview').src = imageURL;
        }
    });
});