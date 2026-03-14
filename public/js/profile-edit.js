
document.addEventListener("DOMContentLoaded", () => {

    const profileEditForm = document.getElementById('profileEdit-form');
    const openProfileEdit = document.getElementById('edit-profile');
    const closeProfileEdit = document.getElementById('close-profileEdit');
    const profileImage = document.getElementById('profile_image');
    const profilePicture = document.getElementById('profile-preview');

    const resetProfileData = document.getElementById('cancel-edit');
    const saveProfileData = document.getElementById('save-profile');

    profileImage.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            const imageURL = URL.createObjectURL(file);
            profilePicture.src = imageURL;
        }
    });

    function showProfileEditForm() {
        profileEditForm.classList.remove('hidden-form');
        profileEditForm.classList.add('visible-form');
    }

    function hideProfileEditForm() {
        profileEditForm.classList.remove('visible-form');
        profileEditForm.classList.add('hidden-form');
    }

    function toggleProfileEditForm() {
        if (profileEditForm.classList.contains('hidden-form')) {
            showProfileEditForm();
        } else {
            hideProfileEditForm();
        }
    }

    openProfileEdit.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showProfileEditForm();
    });

    closeProfileEdit.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideProfileEditForm();
    });

    document.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});