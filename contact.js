 document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contact-form');

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            let hasErrors = false;

            if (name === '') {
                document.getElementById('name').classList.add('is-invalid');
                hasErrors = true;
            } else {
                 document.getElementById('name').classList.remove('is-invalid');
            }
            if (email === '') {
                document.getElementById('email').classList.add('is-invalid');
                hasErrors = true;
            }  else {
                 document.getElementById('email').classList.remove('is-invalid');
            }
            if (phone === '') {
                document.getElementById('phone').classList.add('is-invalid');
                hasErrors = true;
            } else {
                document.getElementById('phone').classList.remove('is-invalid');
            }
             if (message === '') {
                document.getElementById('message').classList.add('is-invalid');
                hasErrors = true;
            } else {
                document.getElementById('message').classList.remove('is-invalid');
            }

            if (hasErrors) {
                return; // Stop form submission if there are errors
            }



            // If the form is valid, you can proceed with submission (e.g., via AJAX)
            // For this example, I'll just display an alert:
            alert('Form submitted successfully!');
            form.reset(); // Clear the form
             //Remove is-invalid class from all the input fields
            document.getElementById('name').classList.remove('is-invalid');
            document.getElementById('email').classList.remove('is-invalid');
            document.getElementById('phone').classList.remove('is-invalid');
            document.getElementById('message').classList.remove('is-invalid');

        });
    });