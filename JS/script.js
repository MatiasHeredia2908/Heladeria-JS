let clientes = JSON.parse(localStorage.getItem('clientes')) || []
let carrito = []
let maxSabores = 3
let itemActual = null

document.getElementById('BotonGuardar').addEventListener('click', function(){
    let nombre = document.getElementById('NombreCliente').value;
    let direccion = document.getElementById('DireccionCliente').value;
    let numero = document.getElementById('NumeroCliente').value;

    if (nombre && direccion && numero) {
        localStorage.setItem('clienteNombre', nombre);
        localStorage.setItem('clienteDireccion',direccion);
        localStorage.setItem('clienteNumero', numero);

        document.getElementById('formulario-usuario').style.display = 'none';

        let mensaje = `¡Bienvenido/a ${nombre}! Su dirección es ${direccion} y su número es ${numero}.`;
        document.getElementById('mensaje-personalizado').textContent = mensaje

        document.getElementById('editarInformacion').style.display = 'block';
        document.getElementById('mensaje-personalizado').style.display = 'block';
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

document.getElementById('editarInformacion').addEventListener('click', function(){
    document.getElementById('formulario-usuario').scrollIntoView({behavior: 'smooth'})
    document.getElementById('formulario-usuario').style.display = 'block';
    document.getElementById('mensaje-personalizado').style.display = 'none';
    document.getElementById('editarInformacion').style.display = 'none';
})

document.querySelectorAll('.tamaño').forEach(button => {
    button.addEventListener('click', function(){
        let tamaño = this.getAttribute('data-tamaño');

        if (!itemActual || itemActual.tamaño !== tamaño){
            itemActual = {
                tamaño: tamaño,
                sabores: [],
                precio: tamaño === 'kilo' ? 17600 : tamaño === 'medio' ? 11000 : tamaño === 'cuarto' ? 6000 : 0
            }

            document.querySelectorAll('.tamaño').forEach(btn => {
                btn.disabled = btn !== button;
                btn.classList.remove('seleccionado')
            })
            button.classList.add('seleccionado')
        } else {
            itemActual = null
            document.querySelectorAll('.tamaño').forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('seleccionado')
            })
        }

        scrollToNextSection('seccion-sabores')
        })
})

document.querySelectorAll('.sabor').forEach(button => {
    button.addEventListener('click', function(){
        let sabor = this.getAttribute('data-sabor')
        if (itemActual && itemActual.sabores.length < maxSabores) {
            let index = itemActual.sabores.indexOf(sabor)
            if (index === -1) {
                itemActual.sabores.push(sabor)
                this.classList.add('seleccionado')
            } else {
                itemActual.sabores.splice(index, 1)
                this.classList.remove('seleccionado');
            }

            if (itemActual.sabores.length >= maxSabores){
                document.querySelectorAll('.sabor').forEach(btn => {
                    if (!btn.classList.contains('seleccionado')){
                        btn.disabled = true
                    }
                })
        } else {
            document.querySelectorAll('.sabor').forEach(btn => btn.disabled = false)}
        }
    })
})

document.getElementById('agregarmas-boton').addEventListener('click', function(){
    if (!itemActual || itemActual.sabores.length === 0){
        alert('Debes seleccionar un tamaño y al menos un sabor')
        return;
    }

    carrito.push(itemActual);

    let listaCarrito = document.getElementById('listaCarrito')
    listaCarrito.innerHTML= '';

    let total = 0;
    carrito.forEach(item => {
        let listaItem = document.createElement('li')
        listaItem.textContent = `${item.tamaño.toUpperCase()} - Sabores: ${item.sabores.join(', ')} - Precio: $${item.precio}`
        listaCarrito.appendChild(listaItem)
        total += item.precio;
    })

    document.getElementById('totalPrecio').textContent = `Total: $${total}`

    itemActual = null;

    document.querySelectorAll('.tamaño').forEach(btn => {
        btn.disabled = false
        btn.classList.remove('seleccionado')
    })
    document.querySelectorAll('.sabor').forEach(btn => {
        btn.disabled = false
        btn.classList.remove('seleccionado')
    })

    scrollToNextSection('seccion-tamaño')
})

document.getElementById('finalizar-boton').addEventListener('click', function(){
    if (carrito.length === 0){
        alert('No hay items en el carrito')
        return;
    }

    alert("Gracias por su compra. Su pedido ha sido enviado :)")

    document.getElementById('listaCarrito').innerHTML = ''
    document.getElementById('totalPrecio').textContent = `Total: $${0}`

    document.getElementById('formulario').style.display = 'block';

    document.getElementById('NombreCliente').value = '' 
    document.getElementById('DireccionCliente').value = '' 
    document.getElementById('NumeroCliente').value = ''

    localStorage.removeItem('clientes') 
    localStorage.removeItem('clienteNombre')
    localStorage.removeItem('clienteDireccion')
    localStorage.removeItem('clienteNumero')

    scrollToTop();
})

function scrollToNextSection(seccionId){
    document.getElementById(seccionId).scrollIntoView({behavior: 'smooth'})
}

function scrollToTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
}

window.onload = function(){
    let nombre = localStorage.getItem('clienteNombre')
    let direccion = localStorage.getItem('clienteDireccion')
    let numero = localStorage.getItem('clienteNumero')

    if (nombre && direccion && numero) {
        document.getElementById('formulario-usuario').style.display = 'none'
        document.getElementById('mensaje-personalizado').textContent = `¡Bienvenido/a ${nombre}! Su dirección es ${direccion} y su número es ${numero}.`
        document.getElementById('mensaje-personalizado').style.display = 'block'
        document.getElementById('editarInformacion').style.display = 'block'
    }
}
