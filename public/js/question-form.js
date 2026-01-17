


document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('linked-to-content');
    const linkedContentGroup = document.getElementById('linked-content-group');

    function toggleSelectVisibility() {
        if (checkbox.checked) {
            linkedContentGroup.classList.remove('hidden-div');
        } else {
            linkedContentGroup.classList.add('hidden-div');
        }
    }
    // Attach the event listener to the checkbox
    checkbox.addEventListener('change', toggleSelectVisibility);
    toggleSelectVisibility();

    const questionForm = document.getElementById('question-form');
    const closeQuestionButton = document.getElementById('close-question');
    const askQuestionForm = document.getElementById('ask-question');
    const mainQuestionSubmitButton = document.getElementById('question-action');
    const successQuestionButton = document.getElementById('question-success');

    const toggleButtonIds = ['body-question', 'footer-question'];

    function showForm() {
        questionForm.classList.remove('hidden-form');
        questionForm.classList.add('visible-form');
        console.log("Question form opened.");
    }

    function hideForm() {
        questionForm.classList.remove('visible-form');
        questionForm.classList.add('hidden-form');
        console.log("Question form closed.");
    }

    document.addEventListener('click', (e) => {
        e.stopPropagation();
        if (questionForm.classList.contains('visible-form')) {
            hideForm();
        }
    });

    function toggleForm() {
        if (questionForm.classList.contains('hidden-form')) {
            showForm();
        } else {
            hideForm();
        }
    }

    toggleButtonIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleForm();
            });
            console.log(`SUCCESS: Listener attached to button: ${id}`);
        } else {
            // This error will now fire if the element truly isn't in the DOM
            console.error(`ERROR: Button with ID ${id} not found.`);
        }
    });

    // 2. Hide Form on Close Button Click (Close button on the popup)
    closeQuestionButton.addEventListener('click', (e) => {
        e.stopPropagation();
        hideForm();
    });

    askQuestionForm.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // 3. Form Submission Handling (Remains the same, forces a hide)
    askQuestionForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Log data (replace with actual AJAX/fetch request to server)
        const subject = document.getElementById('subject').value;
        const linkedQueston = document.getElementById('linked-to-content').value;
        const linkedContent = document.getElementById('linked-content').value;
        const details = document.getElementById('details').value;
        const priority = document.getElementById('priority').value;
        const makePublic = document.getElementById('make-public').value;

        console.log(`Submitting: 
            Subject = '${subject}', 
            Linked Question ='${linkedQueston}',
            Linked Content ='${linkedContent}',
            Details ='${details}',
            Priority ='${priority}',
            Make Public ='${makePublic}'
            `);

        // Phase 1: Show Success Message (500ms duration)

        // Hide the main submit button
        mainQuestionSubmitButton.classList.add('hidden-button');

        // Show the success button
        successQuestionButton.classList.remove('hidden-button');

        console.log("Success message shown.");

        // Phase 2: Wait 2500ms, then hide the form and reset state
        setTimeout(() => {
            // Hide the pop-up (This is the "pop off" action)
            hideForm();

            // Wait longer than the animation duration (0.4s) before resetting the buttons
            setTimeout(() => {
                // Reset: Hide success, show main button, reset form
                successQuestionButton.classList.add('hidden-button');
                mainQuestionSubmitButton.classList.remove('hidden-button');
                askQuestionForm.reset();
                console.log("Form reset complete.");
            }, 500); // 1 second delay to ensure pop-off animation finishes

        }, 1500);
    });

});