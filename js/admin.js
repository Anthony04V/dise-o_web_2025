// Datos simulados de ejemplo
const coordinadores = [];
const analistas = [];
const tiposPago = [];
const tiposDevolucion = [];

// Función para mostrar el formulario
function mostrarFormulario(tipo) {
    document.getElementById('formModalLabel').textContent = `Agregar ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;
    document.getElementById('formAdmin').onsubmit = function(event) {
        event.preventDefault();
        guardarElemento(tipo);
    };
    $('#formModal').modal('show');
}

// Función para guardar los elementos
function guardarElemento(tipo) {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;

    let nuevoElemento = { nombre, descripcion };

    if (tipo === 'coordinador') {
        coordinadores.push(nuevoElemento);
        actualizarLista('coordinador');
    } else if (tipo === 'analista') {
        analistas.push(nuevoElemento);
        actualizarLista('analista');
    } else if (tipo === 'tipoPago') {
        tiposPago.push(nuevoElemento);
        actualizarLista('tipoPago');
    } else if (tipo === 'tipoDevolucion') {
        tiposDevolucion.push(nuevoElemento);
        actualizarLista('tipoDevolucion');
    }

    // Limpiar el formulario y cerrar el modal
    document.getElementById('nombre').value = '';
    document.getElementById('descripcion').value = '';
    $('#formModal').modal('hide');
}

// Función para actualizar las listas
function actualizarLista(tipo) {
    let lista = [];
    if (tipo === 'coordinador') {
        lista = coordinadores;
    } else if (tipo === 'analista') {
        lista = analistas;
    } else if (tipo === 'tipoPago') {
        lista = tiposPago;
    } else if (tipo === 'tipoDevolucion') {
        lista = tiposDevolucion;
    }

    const listaHTML = lista.map(item => `<li class="list-group-item text-light">${item.nombre} - ${item.descripcion}</li>`).join('');
    
    if (tipo === 'coordinador') {
        document.getElementById('coordinadoresList').innerHTML = listaHTML;
    } else if (tipo === 'analista') {
        document.getElementById('analistasList').innerHTML = listaHTML;
    } else if (tipo === 'tipoPago') {
        document.getElementById('tiposPagoList').innerHTML = listaHTML;
    } else if (tipo === 'tipoDevolucion') {
        document.getElementById('tiposDevolucionList').innerHTML = listaHTML;
    }
}

// Inicializar las listas de administración
actualizarLista('coordinador');
actualizarLista('analista');
actualizarLista('tipoPago');
actualizarLista('tipoDevolucion');

// Cerrar sesión
function logout() {
    localStorage.removeItem("role");
    window.location.href = "index.html";
}


