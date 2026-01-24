
document.addEventListener('DOMContentLoaded', (event) => {
    
    const subForm = document.getElementById('sub-form');
    const closeButton = document.getElementById('close-sub');
    const newsletterForm = document.getElementById('newsletter-form');
    const mainSubmitButton = document.getElementById('sub-action');
    const successButton = document.getElementById('sub-success');

    // List of all buttons that should trigger the toggle functionality
    const toggleButtonIds = [
        'sub-button',
        'sub-button-md',
        'sub-button-sm',
        'sub-button-xs',
        'portal-subs'
    ];

    // --- Visibility Functions ---

    function showForm() {
        subForm.classList.remove('hidden-form');
        subForm.classList.add('visible-form');
        console.log("Subscription form opened.");
    }

    function hideForm() {
        subForm.classList.remove('visible-form');
        subForm.classList.add('hidden-form');
        console.log("Subscription form closed.");
    }

    function toggleForm() {
        if (subForm.classList.contains('hidden-form')) {
            showForm();
        } else {
            hideForm();
        }
    }

    subForm.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    toggleButtonIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleForm();
            });
            console.log(`SUCCESS: Listener attached to button: ${id}`);
        } else {
            console.error(`ERROR: Button with ID ${id} not found.`);
        }
    });

    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        hideForm();
    });

    document.addEventListener('click', () => {
        if (subForm.classList.contains('visible-form')) {
        hideForm();
        }
    });

    // 3. Form Submission Handling (Remains the same, forces a hide)
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault(); 

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        console.log(`Submitting: Name='${name}', Email='${email}'`);

        mainSubmitButton.classList.add('hidden-button');

        successButton.classList.remove('hidden-button');

        console.log("Success message shown.");

        // Phase 2: Wait 2500ms, then hide the form and reset state
        setTimeout(() => {
            // Hide the pop-up (This is the "pop off" action)
            hideForm();

            // Wait longer than the animation duration (0.4s) before resetting the buttons
            setTimeout(() => {
                // Reset: Hide success, show main button, reset form
                successButton.classList.add('hidden-button');
                mainSubmitButton.classList.remove('hidden-button');
                newsletterForm.reset();
                console.log("Form reset complete.");
            }, 1000); // 1 second delay to ensure pop-off animation finishes

        }, 1500);
    });
});