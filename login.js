document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const name = document.querySelector('input[name="name"]').value;

    const data = { email, password, name };

    fetch('http://localhost:3000/login', {  
        method: 'POST',  
        headers: {  
            'Content-Type': 'application/json',  
        },  
        body: JSON.stringify(data),  
    })  
    .then(response => {
        // Check if the response is okay (status in the range 200-299)
        if (!response.ok) {  
            throw new Error(`HTTP error! status: ${response.status}`);  
        }  
        return response.json();  
    })  
    .then(data => {
        // Handle successful login
        alert(`'Login successful', welcome ${name}!` );
        // Redirect or perform actions upon successful login
        // For example: window.location.href = '/dashboard'; 
    })  
    .catch(error => {  
        console.error('There was a problem with the fetch operation:', error);  
        alert('Failed to log in. Please check your credentials and try again.'); // More user-friendly error message
    });
});


