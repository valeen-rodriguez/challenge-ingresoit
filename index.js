const express = require('express');
const fs = require('fs');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


/////////
app.get('/api/usuarios', (req, res) => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(apiResponse => {
      fs.readFile('usuarios.json', 'utf8', (err, data) => {
        const usuarios = err ? [] : JSON.parse(data);
        res.json([...apiResponse.data, ...usuarios]);
      });
    });
});

app.post('/api/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  fs.readFile('usuarios.json', 'utf8', (err, data) => {
    const usuarios = err ? [] : JSON.parse(data);
    usuarios.push(nuevoUsuario);
    fs.writeFile('usuarios.json', JSON.stringify(usuarios), () => {
      res.json(nuevoUsuario);
    });
  });
});


////////
app.listen(3000, () =>
    console.log('Puerto 3000')
);