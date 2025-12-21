const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');





// formularz zgłoszeniowy
const userNameTicket = document.querySelector('.userNameTicket')
const nrContactTicket = document.querySelector('.nrContactTicket')
const placeIncident = document.querySelector('.placeIncident')
const targetDepartment = document.querySelector('.targetDepartment')
const ticketCategory = document.querySelector('.ticketCategory')
const ticketSubject = document.querySelector('.ticketSubject')
const ticketDesc = document.querySelector('.ticketDesc')

const ticketMaxSub = document.querySelector('.ticketMaxSub')
const ticketMaxDesc = document.querySelector('.ticketMaxDesc')
const btnSubmit = document.querySelector(".btn-submit")


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


// walidacja formularza na stronie głównej



const countWords = (tryb, cel) => {

    tryb.textContent = cel.value.length;
}



ticketSubject.addEventListener('input', () => countWords(ticketMaxSub, ticketSubject))
ticketDesc.addEventListener('input', () => countWords(ticketMaxDesc, ticketDesc))





const checkName = () => {
    if (userNameTicket.value === "") {
        userNameTicket.style = "color:red";
        return
    }
}

btnSubmit.addEventListener('click', checkName)