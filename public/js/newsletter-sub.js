
// // 1. Get DOM element references
// const subForm = document.getElementById('sub-form');
// const closeButton = document.getElementById('close-sub');
// const newsletterForm = document.getElementById('newsletter-form');
// const mainSubmitButton = document.getElementById('sub-action');
// const successButton = document.getElementById('sub-success');

// const toggleButtonIds = [
//     'sub-button',
//     'sub-button-md',
//     'sub-button-sm',
//     'sub-button-xs'
// ];

// // --- Visibility Functions ---

// function showForm() {
//     subForm.classList.remove('hidden-form');
//     subForm.classList.add('visible-form');
//     console.log("Subscription form opened.");
// }

// function hideForm() {
//     subForm.classList.remove('visible-form');
//     subForm.classList.add('hidden-form');
//     console.log("Subscription form closed.");
// }

// function toggleForm() {
//     if (subForm.classList.contains('hidden-form')) {
//         showForm();
//     } else {
//         hideForm(); // Close on second click
//     }
// }

// // --- Event Listeners ---

// // 1. Show/Hide Form on all defined Trigger Button Clicks (Toggle Functionality)
// toggleButtonIds.forEach(id => {
//     const button = document.getElementById(id);
//     if (button) {
//         button.addEventListener('click', toggleForm);
//     } else {
//         console.error(`Button with ID ${id} not found.`);
//     }
// });

// // 2. Hide Form on Close Button Click (X button on the popup)
// closeButton.addEventListener('click', hideForm);

// // 3. Form Submission Handling (Remains the same, forces a hide)
// newsletterForm.addEventListener('submit', function (e) {
//     e.preventDefault(); // Stop the default browser form submission

//     // Log data (replace with actual AJAX/fetch request to server)
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     console.log(`Submitting: Name='${name}', Email='${email}'`);

//     // Phase 1: Show Success Message (500ms duration)

//     // Hide the main submit button
//     mainSubmitButton.classList.add('hidden-button');

//     // Show the success button
//     successButton.classList.remove('hidden-button');

//     console.log("Success message shown.");

//     // Phase 2: Wait 500ms, then hide the form and reset state
//     setTimeout(() => {
//         // Hide the pop-up (This is the "pop off" action)
//         hideForm();

//         // Wait longer than the animation duration (0.4s) before resetting the buttons
//         setTimeout(() => {
//             // Reset: Hide success, show main button, reset form
//             successButton.classList.add('hidden-button');
//             mainSubmitButton.classList.remove('hidden-button');
//             newsletterForm.reset();
//             console.log("Form reset complete.");
//         }, 2000); // 1 second delay to ensure pop-off animation finishes

//     }, 1500); // Wait 0.5 seconds (500ms) while showing the success message
// });


// NEW: Ensure all DOM elements are loaded before attempting to attach listeners
document.addEventListener('DOMContentLoaded', (event) => {
    // 1. Get DOM element references
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
        'sub-button-xs'
    ];

    // --- Visibility Functions ---

    /**
     * Removes 'hidden-form' and adds 'visible-form' for smooth slide-in.
     */
    function showForm() {
        subForm.classList.remove('hidden-form');
        subForm.classList.add('visible-form');
        console.log("Subscription form opened.");
    }

    /**
     * Removes 'visible-form' and adds 'hidden-form' for smooth slide-out.
     */
    function hideForm() {
        subForm.classList.remove('visible-form');
        subForm.classList.add('hidden-form');
        console.log("Subscription form closed.");
    }

    /**
     * Toggles the visibility of the form based on its current state.
     */
    function toggleForm() {
        if (subForm.classList.contains('hidden-form')) {
            showForm();
        } else {
            hideForm();
        }
    }

    // --- Event Listeners ---

    // 1. Show/Hide Form on all defined Trigger Button Clicks (Toggle Functionality)
    toggleButtonIds.forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', toggleForm);
            console.log(`SUCCESS: Listener attached to button: ${id}`);
        } else {
            // This error will now fire if the element truly isn't in the DOM
            console.error(`ERROR: Button with ID ${id} not found.`);
        }
    });

    // 2. Hide Form on Close Button Click (X button on the popup)
    closeButton.addEventListener('click', hideForm);

    // 3. Form Submission Handling (Remains the same, forces a hide)
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop the default browser form submission

        // Log data (replace with actual AJAX/fetch request to server)
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        console.log(`Submitting: Name='${name}', Email='${email}'`);

        // Phase 1: Show Success Message (500ms duration)

        // Hide the main submit button
        mainSubmitButton.classList.add('hidden-button');

        // Show the success button
        successButton.classList.remove('hidden-button');

        console.log("Success message shown.");

        // Phase 2: Wait 500ms, then hide the form and reset state
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

        }, 500);
    });
}); // End of DOMContentLoaded