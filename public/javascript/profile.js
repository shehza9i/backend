// public/js/profile.js

const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));

if (userDetails) {
    document.getElementById('user-name').innerText = userDetails.name || 'N/A';
    document.getElementById('user-email').innerText = userDetails.email || 'N/A';
    document.getElementById('user-phone').innerText = userDetails.phone || 'N/A';
    document.getElementById('user-role').innerText = userDetails.role || 'N/A';
    document.getElementById('user-createdAt').innerText = userDetails.createdAt
        ? new Date(userDetails.createdAt).toLocaleDateString()
        : 'N/A';
} else {
    console.error('No user details found. Redirecting to login page.');
    window.location.href = '/public/login.html'; // Adjust if necessary
}

console.log(userDetails);
