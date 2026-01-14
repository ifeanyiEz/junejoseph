document.addEventListener('DOMContentLoaded', () => {
    const writePost = document.getElementById('write-post');
    const writePostForm = document.getElementById('blogPost-form');

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

    if (writePost) {
        writePost.addEventListener('click', toggleForm);
        console.log(`Successfully attached listener to button: ${writePost}`);
    } else {
        console.error(`There's no ${writePost} button on the page`);
    }

});