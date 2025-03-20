// Obtener los elementos de filtro
const fechaPago = document.getElementById('fechaPago');
const tipoPago = document.getElementById('tipoPago');
const tablaPagos = document.querySelector('tbody');

// Filtrar pagos por fecha y tipo de pago
fechaPago.addEventListener('change', filtrarPagos);
tipoPago.addEventListener('change', filtrarPagos);

function filtrarPagos() {
    const fechaSeleccionada = fechaPago.value;
    const tipoSeleccionado = tipoPago.value.toLowerCase();

    const filas = tablaPagos.getElementsByTagName('tr');
    for (let fila of filas) {
        const celdas = fila.getElementsByTagName('td');
        if (celdas.length > 0) {
            const fechaPagoCelda = celdas[2].innerText; // Suponiendo que la fecha está en la tercera columna
            const tipoPagoCelda = celdas[1].innerText.toLowerCase(); // Suponiendo que el tipo de pago está en la segunda columna

            let mostrarFila = true;

            // Filtrar por fecha
            if (fechaSeleccionada && !fechaPagoCelda.includes(fechaSeleccionada)) {
                mostrarFila = false;
            }

            // Filtrar por tipo de pago
            if (tipoSeleccionado !== "todos" && tipoPagoCelda !== tipoSeleccionado) {
                mostrarFila = false;
            }

            // Mostrar u ocultar fila según los filtros
            if (mostrarFila) {
                fila.style.display = "";
            } else {
                fila.style.display = "none";
            }
        }
    }
}

// Funciones para manejar las acciones de los botones
function devolverPago(event) {
    const fila = event.target.closest('tr');
    const estadoCelda = fila.cells[3];
    
    if (estadoCelda && estadoCelda.innerText !== 'Creada') {
        estadoCelda.innerText = 'Creada';
        alert("El pago ha sido devuelto.");
    } else {
        alert("Este pago ya está en estado 'Creada'.");
    }
}

function marcarComoPagado(event) {
    const fila = event.target.closest('tr');
    const estadoCelda = fila.cells[3];
    const fechaPagoCelda = fila.cells[2];

    if (estadoCelda && estadoCelda.innerText === 'Enviada') {
        estadoCelda.innerText = 'Pagada';
        fechaPagoCelda.innerText = new Date().toLocaleDateString(); // Establece la fecha actual
        alert("El pago ha sido marcado como pagado.");
    } else {
        alert("Este pago no está en estado 'Enviada'.");
    }
}

// Añadir event listeners a los botones de cada fila
document.querySelectorAll('.btn-warning').forEach(button => {
    button.addEventListener('click', devolverPago);
});

document.querySelectorAll('.btn-success').forEach(button => {
    button.addEventListener('click', marcarComoPagado);
});


function logout() {
    localStorage.removeItem("role"); // Eliminar el rol del usuario
    console.log("Sesión cerrada. Redirigiendo a login...");
    window.location.href = "../html/index.html"; // Cambia la ruta según corresponda
}

