document.addEventListener('DOMContentLoaded', function() {
    obtenerUsuarios();
    document.getElementById('formulario-usuario').addEventListener('submit', agregarUsuario);
    document.getElementById('buscador').addEventListener('input', filtrarUsuarios);
});

function obtenerUsuarios() {
    fetch('http://localhost:3000/api/usuarios')
    .then(response => response.json())
    .then(usuarios => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        mostrarUsuarios(usuarios);
    })
    .catch(() => {
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        mostrarUsuarios(usuariosGuardados);
    });
}

function mostrarUsuarios(usuarios) {
    const listaUsuarios = document.getElementById('usuarios-lista');
    listaUsuarios.innerHTML = '';
    
    usuarios.forEach(usuario => {
        const div = document.createElement('div');
        div.classList.add('usuario');
        div.innerHTML = `
        <p>Nombre: ${usuario.name}</p>
        <p>Username: ${usuario.username}</p>
        <p>Email: ${usuario.email}</p>
        <p>Dirección: ${usuario.address.street}, ${usuario.address.city}</p>
        <p>Telefono: ${usuario.phone}</p>
        <p>Compania: ${usuario.company.name}</p>
        `;
        listaUsuarios.appendChild(div);
    });
}

function agregarUsuario(event) {
    event.preventDefault();
    const nuevoUsuario = {
        name: document.getElementById('nombre').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        address: {
            street: document.getElementById('ciudad').value, 
            city: document.getElementById('ciudad').value
        },
        phone: document.getElementById('telefono').value,
        company: {
            name: document.getElementById('empresa').value
        }
    };

fetch('http://localhost:3000/api/usuarios', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoUsuario)
})

.then(response => response.json())
.then(data => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuariosGuardados.push(data);
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
    mostrarUsuarios(usuariosGuardados);
})

.catch(() => 
    alert('err en agregar usuario')
);
}

function filtrarUsuarios(event) {
    const textoBusqueda = event.target.value.toLowerCase();
    const usuariosDivs = document.querySelectorAll('.usuario');
    usuariosDivs.forEach(usuarioDiv => {
        const texto = usuarioDiv.textContent.toLowerCase();
        usuarioDiv.style.display = texto.includes(textoBusqueda) ? 'block' : 'none';
    });
}