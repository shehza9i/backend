// Handle form submission
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    

    // Check if all required fields are filled
    if (!name || !age || !role || !password || !email)  {
        alert('Please fill in all fields.');
        return;
    }

    if(age < -1) {
        alert("age cannot be negative");
        return;
    }

    if(password.length < 8) {
        alert("password must be at least 8 characters" );
        return;
    }

    if(password == "password" || password == "Password" || password == "PASSWORD" ) {
        alert("password cannot be password");
        return;
    }

    // Send data to the server using fetch
    fetch('https://backend-qwms.onrender.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, role, password, email })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Data submitted successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to submit data. Please try again.');
        console.log(error)
    });
});

