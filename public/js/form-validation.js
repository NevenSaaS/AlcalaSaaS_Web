document.getElementById('demo-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validar nombre
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (name.value.trim() === '') {
        nameError.textContent = 'El nombre es obligatorio';
        nameError.style.display = 'block';
    } else {
        nameError.style.display = 'none';
    }

    // Validar email
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = 'Por favor, introduce un email válido';
        emailError.style.display = 'block';
    } else {
        emailError.style.display = 'none';
    }

    // Validar negocio
    const business = document.getElementById('business');
    const businessError = document.getElementById('business-error');
    if (business.value.trim() === '') {
        businessError.textContent = 'El nombre del negocio es obligatorio';
        businessError.style.display = 'block';
    } else {
        businessError.style.display = 'none';
    }
});
