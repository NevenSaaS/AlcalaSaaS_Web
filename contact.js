document.getElementById('demo-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const business = document.getElementById('business');
    const plan = document.getElementById('plan');  // Obtener el campo plan
    const description = document.getElementById('description');  // Obtener el campo descripción

    // Validación de campos
    if (name.value.trim() === "") {
        valid = false;
        document.getElementById('name-error').textContent = "El nombre es obligatorio";
    } else {
        document.getElementById('name-error').textContent = "";
    }

    if (email.value.trim() === "") {
        valid = false;
        document.getElementById('email-error').textContent = "El email es obligatorio";
    } else if (!email.value.includes('@')) {
        valid = false;
        document.getElementById('email-error').textContent = "El email no es válido";
    } else {
        document.getElementById('email-error').textContent = "";
    }

    if (business.value.trim() === "") {
        valid = false;
        document.getElementById('business-error').textContent = "El nombre del negocio es obligatorio";
    } else {
        document.getElementById('business-error').textContent = "";
    }

    // Validación del plan
    if (plan.value.trim() === "") {
        valid = false;
        document.getElementById('plan-error').textContent = "El plan es obligatorio";
    } else {
        document.getElementById('plan-error').textContent = "";
    }

    // Validación de la descripción
    if (description.value.trim() === "") {
        valid = false;
        document.getElementById('description-error').textContent = "La descripción es obligatoria";
    } else {
        document.getElementById('description-error').textContent = "";
    }

    if (valid) {
        // Envío de datos al servidor si la validación es exitosa
        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                name: name.value,
                email: email.value,
                business: business.value,
                plan: plan.value,
                description: description.value
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al enviar el correo');
            }
        })
        .then(data => {
            console.log("Correo enviado con éxito:", data);
            // Mostrar el mensaje de éxito
            document.getElementById('success-message').style.display = 'block';
            document.getElementById('error-message').style.display = 'none';
        })
        .catch(error => {
            console.error("Error:", error);
            // Mostrar el mensaje de error
            document.getElementById('success-message').style.display = 'none';
            document.getElementById('error-message').style.display = 'block';
        });
    }
});
