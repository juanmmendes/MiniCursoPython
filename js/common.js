document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', event => {
        // Remove 'active' class from all nav items
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        // Add 'active' class to the clicked nav item
        item.classList.add('active');
    });
});


