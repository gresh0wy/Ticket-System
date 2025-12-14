const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');



hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Zamknij menu po kliknięciu w link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});




