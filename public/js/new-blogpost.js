document.addEventListener('DOMContentLoaded', () => {
    const writePost = document.getElementById('write-post');
    const closePost = document.getElementById('close-post');
    const writePostForm = document.getElementById('blogPost-form');
    const createPostForm = document.getElementById('create-post');

    const addSourceBtn = document.getElementById('add-source');
    const sourcesContainer = document.getElementById('sources-container');
    const sourceTemplate = document.getElementById('source-item');

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

    closePost.addEventListener('click', (e) => {
        e.stopPropagation();
        hideForm();
    });

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

    addSourceBtn.addEventListener('click', () => {
        
        const newSource = sourceTemplate.cloneNode(true);
        newSource.classList.remove('hidden-div');

        const inputs = newSource.querySelectorAll('input');
        inputs.forEach(input => input.value = '');

        const deleteBtn = newSource.querySelector('.delete-source');

        sourcesContainer.appendChild(newSource);

        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            newSource.remove();
        });
    });


    createPostForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const clickedButton = e.submitter;
        const submitStatus = clickedButton.id === 'publish' ? 'publish' : 'save-draft';

        const blogBody = quill.root.innerHTML.trim();

        if (!blogBody || blogBody === "<p><br></p>") {
            alert("Blog content is required!");
            return;
        }

        const newPost = {
            postTitle: document.getElementById('blog-title').value,
            postCategory: document.getElementById('blog-category').value,
            postSubCategory: document.getElementById('sub-category').value,
            blogHeroImage: document.getElementById('blog-heroImage').value,
            blogContent: blogBody,
            createDate: document.getElementById('createDate').value,
            blogTags: document.getElementById('blog-tags').value,
            writtenBy: document.getElementById('writtenBy').value,
            writerEmail: document.getElementById('writerEmail').value,
            featuredBlog: document.getElementById('featured-blog').value,
            featuredStart: document.getElementById('featured-start').value,
            featuredEnd: document.getElementById('featured-end').value,
            publishedAt: new Date(),
            submitStatus: submitStatus
        };

        console.log("Blog data before submission:", newPost);

    });


});