document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
    
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
    
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }
    
        if (!email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
    
        alert('Form submitted successfully!');
        form.reset();
    });
});

document.querySelector(".registration-form").addEventListener("submit", function(event) {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    if (name === "" || email === "") {
        alert("Please fill in all required fields.");
        event.preventDefault();
    }
});