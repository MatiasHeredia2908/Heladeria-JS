let clientes = JSON.parse(localStorage.getItem('clientes')) || []
let carrito = []

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

document.getElementById('editarBoton').addEventListener('click', function(){
    document.getElementById('formulario').style.display='block'
    document.getElementById('bienvenida').style.display='none'

    let nombre = localStorage.getItem('clienteNombre')
    let direccion = localStorage.getItem('clienteDireccion')
    let numero = localStorage.getItem('clienteNumero')

    document.getElementById('NombreCliente').value = nombre || ''
    document.getElementById('DireccionCliente').value = direccion || ''
    document.getElementById('NumeroCliente').value = numero || ''
})

document.querySelectorAll('.tamaño').forEach(button => {
    button.addEventListener('click', function(){
        let tamaño = this.getAttribute('data-tamaño')
        let item={
            tamaño: tamaño,
            sabores: [],
            precio: tamaño === 'kilo' ? 17600 : tamaño === 'medio' ? 11000 : tamaño === 'cuarto' ? 6000 : 0
        }
        
        carrito.push(item)
        document.getElementById('bienvenida').style.display = 'none'
        document.getElementById('sabores').style.display = 'block'
        })
})

document.querySelectorAll('.sabor').forEach(button => {
    button.addEventListener('click', function(){
        let sabor = this.getAttribute('data-sabor')
        if (carrito.length > 0) {
            let index = carrito[carrito.length - 1].sabores.indexOf(sabor)
            if (index === -1) {
            carrito[carrito.length - 1].sabores.push(sabor)
            this.classList.add('sabor-seleccionado')
            } else {
                carrito[carrito.length - 1].sabores.splice(index, 1)
                this.classList.remove('sabor-seleccionado')
            }
        }
    })
})

document.getElementById('carrito-boton').addEventListener('click', function(){
    document.getElementById('sabores').style.display='none'
    document.getElementById('carrito').style.display='block'

    let listaCarrito = document.getElementById('listaCarrito')
    listaCarrito.innerHTML = ''

    let total = 0
    carrito.forEach(item => {
        let ListaItem = document.createElement('li')
        ListaItem.textContent = `${item.tamaño.toUpperCase()} - Sabores: ${item.sabores.join(',')} - Precio: $${item.precio}`
        listaCarrito.appendChild(ListaItem)
        total += item.precio
    })

    document.getElementById('totalPrecio').textContent= `Total: $${total}`
})

document.getElementById('agregarmas-boton').addEventListener('click', function(){
    document.getElementById('sabores').style.display='none'
    document.getElementById('carrito').style.display='block'

    document.querySelectorAll('.sabor').forEach(button => {
        button.classList.remove('sabor-seleccionado')
    })

    if (carrito.length > 0){
        carrito[carrito.length - 1].sabores = []
    }
})

document.getElementById('atras-boton').addEventListener('click',function(){
    document.getElementById('carrito').style.display='none'
    document.getElementById('bienvenida').style.display='block'
})

document.getElementById('verCarrito-boton').addEventListener('click',function(){
    document.getElementById('bienvenida').style.display='none'
    document.getElementById('carrito').style.display='block'

    let listaCarrito = document.getElementById('listaCarrito')
    listaCarrito.innerHTML = ''

    let total = 0
    carrito.forEach(item => {
        let ListaItem = document.createElement('li')
        ListaItem.textContent = `${item.tamaño.toUpperCase()} - Sabores: ${item.sabores.join(',')} - Precio: $${item.precio}`
        listaCarrito.appendChild(ListaItem)
        total += item.precio

        document.getElementById('totalPrecio').textContent = `Total: $${total}`
    })
})

document.getElementById('finalizar-boton').addEventListener('click', function(){
    if (carrito.length === 0){
        alert('No hay items en el carrito')
        return;
    }

    alert("Gracias por su compra. :)")

    document.getElementById('listaCarrito').innerHTML = ''
    document.getElementById('totalPrecio').textContent = `Total: $${0}`

    document.getElementById('formualrio').style.display = 'block'
    document.getElementById('bienvenida').style.display = 'none'
    document.getElementById('carrito').style.display = 'none'

    document.getElementById('NombreCliente').value = '' 
    document.getElementById('DireccionCliente').value = '' 
    document.getElementById('NumeroCliente').value = ''

    localStorage.removeItem('clienteNombre')
    localStorage.removeItem('clienteDireccion')
    localStorage.removeItem('clienteNumero')
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
