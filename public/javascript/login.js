// public/js/login.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const role = document.getElementById('role').value;

    const data = { email, password, role };

    fetch('https://backend-qwms.onrender.com/login', {  
        method: 'POST',  
        headers: {  
            'Content-Type': 'application/json',  
        },  
        body: JSON.stringify(data),  
    })  
    .then(response => {
        if (!response.ok) {  
            throw new Error(`HTTP error! status: ${response.status}`);  
        }  
        return response.json();  
    })  
    .then(data => {
        // Handle successful login
        alert(`Login successful, welcome ${data.name}!`);
        document.getElementById('loginForm').reset();

        // Store user details in session storage
        sessionStorage.setItem('userDetails', JSON.stringify(data));

        // Redirect to the profile page
        window.location.href = 'profile.html'; 
    })  
    .catch(error => {  
        console.error('There was a problem with the fetch operation:', error);  
        alert('Failed to log in. Please check your credentials and try again.');
    });
});
