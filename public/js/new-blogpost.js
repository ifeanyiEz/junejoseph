document.addEventListener('DOMContentLoaded', () => {
    const writePost = document.getElementById('write-post');
    const writePostForm = document.getElementById('blogPost-form');

    if (!writePost || !writePostForm) {
        console.error('Required elements not found');
        return;
    }

    function showForm() {
        writePostForm.classList.remove('hidden-form');
        writePostForm.classList.add('visible-form');
        console.log('New blog post form opened');
    }

    function hideForm() {
        writePostForm.classList.remove('visible-form');
        writePostForm.classList.add('hidden-form');
        console.log('New blog post form closed');
    }

    function toggleForm () {
        if (writePostForm.classList.contains('hidden-form')) {
            showForm();
        } else {
            hideForm();
        }
    }

    writePost.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleForm();
    } );

    writePostForm.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('click', () => {
        if (writePostForm.classList.contains('visible-form')) {
        hideForm();
        }
    });

});