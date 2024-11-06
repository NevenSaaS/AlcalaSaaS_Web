let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides-container');
const nextButton = document.querySelector('.next-slide');
const prevButton = document.querySelector('.prev-slide');

// Función para mostrar el slide correspondiente
function showSlide(index) {
    const slideWidth = slides[0].clientWidth; // Ancho del slide
    slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`; // Mueve los slides
}

// Función para avanzar automáticamente cada 5 segundos
function autoSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Avanza cada 5 segundos
setInterval(autoSlide, 5000);

// Funcionalidad de los botones
nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Función para guardar el plan seleccionado en el localStorage
function setPlan(plan) {
    localStorage.setItem('selectedPlan', plan);
}

function toggleDetails(id) {
    const element = document.getElementById(id);
    if (element.style.display === "none" || element.style.display === "") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}
        

function toggleDetails(detailsId) {
    // Oculta todos los detalles abiertos de otras tarjetas
    const allDetails = document.querySelectorAll('.plan-details');
    allDetails.forEach(details => {
        if (details.id !== detailsId) {
            details.style.display = 'none';
        }
    });

    // Alterna el detalle de la tarjeta actual
    const detailsElement = document.getElementById(detailsId);
    if (detailsElement.style.display === 'block') {
        detailsElement.style.display = 'none';
    } else {
        detailsElement.style.display = 'block';
    }
}
