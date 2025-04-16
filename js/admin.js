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



document.addEventListener("DOMContentLoaded", function () {
    function renderReporte(idContenedor, datos, formateador) {
        const contenedor = document.getElementById(idContenedor);
        if (!contenedor) return;
        contenedor.innerHTML = "";

        datos.forEach(item => {
            const row = document.createElement("li");
            row.innerHTML = formateador(item);
            contenedor.appendChild(row);
        });

        if (datos.length === 0) {
            contenedor.innerHTML = "<li>No hay registros disponibles.</li>";
        }
    }

    // Reporte por coordinador
    const pagosPorCoordinador = ordenesPago.map(o => ({
        id_documento: o.id_documento,
        acreedor: o.acreedor,
        coordinador: coordinadores.find(c => c.id_coordinador === o.id_coordinador)?.nombre || "Desconocido",
        estado: estadoCatalogo.find(e => e.id_estado === o.id_estado)?.descripcion || "Desconocido"
    }));
    renderReporte("reporteCoordinador", pagosPorCoordinador, d =>
        `<strong>${d.id_documento}</strong> | ${d.acreedor} | Coordinador: ${d.coordinador} | Estado: ${d.estado}`);

    // Reporte por analista
    const pagosPorAnalista = ordenesPago.filter(o => o.cedula_analista).map(o => ({
        id_documento: o.id_documento,
        acreedor: o.acreedor,
        analista: analistas.find(a => a.cedula_analista === o.cedula_analista)?.nombre || "Desconocido",
        estado: estadoCatalogo.find(e => e.id_estado === o.id_estado)?.descripcion || "Desconocido"
    }));
    renderReporte("reporteAnalista", pagosPorAnalista, d =>
        `<strong>${d.id_documento}</strong> | ${d.acreedor} | Analista: ${d.analista} | Estado: ${d.estado}`);

    // Reporte por tipo de pago
    const pagosPorTipo = ordenesPago.map(o => ({
        id_documento: o.id_documento,
        acreedor: o.acreedor,
        tipo: tipoPagoCatalogo.find(tp => tp.id_tipo_pago === o.id_tipo_pago)?.descripcion || "Desconocido"
    }));
    renderReporte("reporteTipoPago", pagosPorTipo, d =>
        `<strong>${d.id_documento}</strong> | ${d.acreedor} | Tipo de Pago: ${d.tipo}`);

    // Reporte de bitácora
    renderReporte("reporteBitacora", bitacora, b =>
        `ID ${b.id} | ${b.transaccion} en ${b.tabla}.${b.columna} | Antes: ${b.valor_antes} | Después: ${b.valor_despues} | Fecha: ${b.fecha_movimiento}`);

    // Reporte de devoluciones
    renderReporte("reporteDevoluciones", devoluciones, d =>
        `#${d.id_devolucion} | Documento: ${d.id_documento} | Fecha: ${d.fecha_devolucion} | Devuelto por: ${d.cedula_devuelve}`);
});
