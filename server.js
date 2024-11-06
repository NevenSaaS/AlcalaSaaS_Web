require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para el formulario de contacto
app.post('/send-email', (req, res) => {
    const { name, email, business, plan, description } = req.body;
    console.log("Datos recibidos del formulario:");
    console.log(req.body);  // Verifica si los datos llegan correctamente

    if (!name || !email || !business || !plan || !description) {
        console.log("Error: Faltan campos en el formulario.");
        res.status(400).json({ message: 'Faltan campos en el formulario.' });
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: 'Solicitud de Demo',
        text: `Nombre: ${name}\nEmail: ${email}\nNombre del Negocio: ${business}\nPlan Seleccionado: ${plan}\nDescripción del Negocio: ${description}`,
    };

    console.log("Enviando correo...");
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo:", error);
            res.status(500).json({ message: 'Error al enviar el correo.' });
        } else {
            console.log('Correo enviado: ' + info.response);
            res.status(200).json({ message: 'Correo enviado correctamente.' });
        }
    });
});


// Inicia el servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});
