document.getElementById('BotonGuardar').addEventListener('click', function(){
    let nombre = document.getElementById('NombreCliente').value;
    let direccion = document.getElementById('DireccionCliente').value;
    let numero = document.getElementById('NumeroCliente').value;

    if (nombre && direccion && numero) {
        localStorage.setItem('clienteNombre', nombre);
        localStorage.setItem('clienteDireccion',direccion);
        localStorage.setItem('clienteNumero', numero);
        
        document.getElementById('formulario').style.display='none';
        document.getElementById('bienvenida').style.display='block';

        document.getElementById('bienvenida-nombre').textContent = `¡Hola ${nombre}! Tu dirección es ${direccion} y tu numero es ${numero}.`
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

document.querySelectorAll('.tamaño').forEach(button => {
    button.addEventListener('click', function(){
        document.getElementById('bienvenida').style.display = 'none'
        document.getElementById('sabores').style.display = 'block'
        })
})

window.onload = function(){
    let nombre = localStorage.getItem('clienteNombre')
    let direccion = localStorage.getItem('clienteDireccion')
    let numero = localStorage.getItem('clienteNumero')

    if (nombre && direccion && numero) {
        document.getElementById('formulario').style.display = 'none'
        document.getElementById('bienvenida').style.display = 'block'
        document.getElementById('bienvenida-nombre').textContent = `¡Hola ${nombre}! Tu dirección es ${direccion} y tu numero es ${numero}.`
        }
    }
