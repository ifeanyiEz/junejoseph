
// 1. Get DOM element references
const subButton = document.getElementById('sub-button');
const subForm = document.getElementById('sub-form');
const closeButton = document.getElementById('close-sub');
const newsletterForm = document.getElementById('newsletter-form');
const mainSubmitButton = document.getElementById('sub-action');
const successButton = document.getElementById('sub-success');

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

// --- Event Listeners ---

// 1. Show Form on Subscribe Button Click
subButton.addEventListener('click', showForm);

// 2. Hide Form on Close Button Click
closeButton.addEventListener('click', hideForm);

// 3. Form Submission Handling
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

    // Phase 2: Wait 2000ms, then hide the form and reset state
    setTimeout(() => {
        // Hide the pop-up
        hideForm();

        // Wait longer than the animation duration (0.4s) before resetting the buttons
        setTimeout(() => {
            // Reset: Hide success, show main button, reset form
            successButton.classList.add('hidden-button');
            mainSubmitButton.classList.remove('hidden-button');
            newsletterForm.reset();
            console.log("Form reset complete.");
        }, 1000); // 1 second delay to ensure pop-off animation finishes

    }, 2000); // Wait 2 seconds (500ms) while showing the success message
});