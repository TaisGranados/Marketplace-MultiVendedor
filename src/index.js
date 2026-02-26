const express = require('express');
const app = express();

// Definimos el puerto 
const PORT = 3000;

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡El servidor backend está configurado y corriendo perfecto!');
});

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});